const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const dmRouter = require("./dms.cjs")
const prisma = new PrismaClient();

router.use("/dm", dmRouter);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

router.get("/", (req, res) => {
  res.send(`HELLO`);
});

router.post("/post", authenticateToken, async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  try {
    const newPost = await prisma.posts.create({
      data: {
        description,
        user: {
          connect: {
            id: req.user.userId,
          },
        },
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/posts", async (req, res) => {
  const posts = await prisma.posts.findMany({
    include: {
      user: true,
    },
  });

  res.json(posts);
});

router.get("/post/:id", async (req, res) => {
  const post = await prisma.posts.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      user: true,
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

router.get("/notifs/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userPosts = await prisma.posts.findMany({
    where: {
      description: {
        contains: user.username,
      },
    },
    include: {
      user: true,
    },
  });
  console.log(`USER POSTS FROM API`, userPosts);

  res.json(userPosts);
});

router.get("/posts/user/:userid", async (req, res) => {
  const { userid } = req.params;

  if (!userid) {
    return res.status(400).send({ message: "User ID is required" });
  }

  const posts = await prisma.posts.findMany({
    where: {
      userid: parseInt(userid),
    },
    include: {
      user: true,
    },
  });

  res.json(posts);
});

router.delete("/post/:id", authenticateToken, async (req, res) => {
  const post = await prisma.posts.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!post || post.userid !== req.user.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await prisma.posts.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.json({ message: "Post deleted" });
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password, bio, profile_icon } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const userToEdit = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const editUserInfo = await prisma.users.update({
      where: {
        id: userToEdit.id,
      },
      data: {
        username,
        password: hashedPassword,
        bio,
        profile_icon,
      },
    });
    res.send(editUserInfo);
  } catch (err) {
    throw err;
  }
});

router.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/search/user/:username", async (req, res, next) => {
  const { username } = req.params;
  console.log(username);
  try {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        profile_icon: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const userToVerify = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const passwordMatch = await bcrypt.compare(password, userToVerify.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    } else {
      res.send(userToVerify);
    }
  } catch (err) {
    throw err;
  }
});

router.post('/posts/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body

  try {
    const existingLike = await prisma.likes.findUnique({
      where: {
        userid_postid: {
          userid: parseInt(userId),
          postid: parseInt(postId)
        }
      }
    });

    let updatedPost;
    if (existingLike) {
      await prisma.likes.delete({
        where: {
          id: existingLike.id
        }
      });
      updatedPost = await prisma.posts.update({
        where: { id: parseInt(postId) },
        data: {
          like_count: { decrement: 1 }
        }
      });
    } else {
      await prisma.likes.create({
        data: {
          user: { connect: { id: userId } },
          post: { connect: { id: parseInt(postId) } }
        }
      });
      updatedPost = await prisma.posts.update({
        where: { id: parseInt(postId) },
        data: {
          like_count: { increment: 1 }
        }
      });
    }

    const updatedLikes = await prisma.likes.findMany({
      where: { postid: parseInt(postId) },
      include: { user: true }
    })

    res.json({ like_count: updatedPost.like_count, liked_by: updatedLikes });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;


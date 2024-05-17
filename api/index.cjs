const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

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

router.get("/posts/user/:userid", authenticateToken, async (req, res) => {
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

  res.send(posts);
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

module.exports = router;

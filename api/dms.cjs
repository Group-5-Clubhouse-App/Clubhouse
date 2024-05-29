const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  const numUserId = parseInt(userid);
  console.log(numUserId);

  const dms = await prisma.dms.findMany({
    where: {
      users: {
        some: {
          id: {
            equals: numUserId,
          },
        },
      },
    },
    include: {
      users: true,
      messages: true,
    },
  });

  console.log(dms);
  res.send(dms);
});

router.post("/", async (req, res) => {
  const { senderId, recipientId } = req.body;
  const numSenderId = parseInt(senderId);
  const numRecipientId = parseInt(recipientId);
  const recipient = await prisma.users.findUnique({
    where: { id: numRecipientId },
  });
  if (!recipient) {
    return res.status(404).send("Recipient user not found.");
  }
  if (numRecipientId === numSenderId) {
    return res.status(400).send("Cannot send a direct message to your self.");
  }

  const conversation = await prisma.dms.findFirst({
    where: {
      users: {
        some: {
          id: {
            equals: numSenderId,
          },
        },
      },
      users: {
        some: {
          id: {
            equals: numRecipientId,
          },
        },
      },
    },
    include: {
      users: true,
      messages: true,
    },
  });
  if (!conversation) {
    const newConversation = await prisma.dms.create({
      data: {
        users: {
          connect: [{ id: numSenderId }, { id: numRecipientId }],
        },
      },
    });
    res.send(newConversation);
  }
  res.send(conversation);
});

router.post("/:dmId/messages", async (req, res) => {
  const { dmId } = req.params;
  const { userid, content } = req.body;

  try {
    const numDmId = parseInt(dmId);
    const numUserId = parseInt(userid);

    const dm = await prisma.dms.findUnique({
      where: { id: numDmId },
      include: { users: true },
    });

    if (!dm) {
      return res.status(404).send("DM conversation not found");
    }

    const isSenderInConvo = dm.users.some((user) => user.id === numUserId);
    if (!isSenderInConvo) {
      return res.status(403).send("Sender is not part of this conversation.");
    }

    const newMessage = await prisma.messages.create({
      data: {
        content,
        user: { connect: { id: numUserId } },
        dm: { connect: { id: numDmId } },
      },
    });

    console.log(newMessage);
    res.status(201).send(newMessage);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error has occured while saving the message, whoops.");
  }
});

router.get("/:dmId/messages", async (req, res) => {
  const { dmId } = req.params;

  try {
    const numDmId = parseInt(dmId);

    console.log(`Fetching messages for DM ID: ${numDmId}`);

    const dm = await prisma.dms.findUnique({
      where: { id: numDmId },
      include: { messages: true },
    });

    if (!dm) {
      return res.status(404).send("DM conversation not found.");
    }

    const messages = await prisma.messages.findMany({
      where: { dmid: numDmId },
      include: {
        user: {
          select: {
            username: true,
            profile_icon: true,
          },
        },
      },
    });

    console.log(messages);
    res.send(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching messages.");
  }
});

module.exports = router;

module.exports = router;

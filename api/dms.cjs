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
    console.log(newConversation);
    res.send(newConversation);
  }
  console.log(conversation);
  res.send(conversation);
});

module.exports = router;

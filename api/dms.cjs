const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

// we want a route that allows the user to send a message to another specific user 
router.post('/', async (req,res) => {
    const { senderId, recipientId } = req.body
    const numSenderId = parseInt(senderId)
    const numRecipientId = parseInt(recipientId)
// check to see if the recipient is a existing user 
const recipient = await prisma.users.findUnique({
    where: {id: numRecipientId},
});
if (!recipient) {
    return res.status(404).send('Recipient user not found.');
}
//the user should not he allowed to send a message to them selves 
if (numRecipientId === numSenderId) {
    return res.status(400).send ('Cannot send a direct message to your self.');
}


// check to see if a conversation between the two users exist already 
console.log('this is realley not okay')
const conversation = await prisma.dms.findFirst({
    where: {
        users: {
            some: {
                id:{
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
        messages: true
    }
});
// CReate a new convo between the two users if it dosent already exist 
console.log('this is not okay okay?')
if(!conversation) {
    console.log('im in the mainframe ')
   const newConversation = await prisma.dms.create({
        data: {
            users: {
                connect: [
                    {id: numSenderId},
                    {id: numRecipientId},
                ],
            },
        },
    });
    console.log('this is not okay')
    console.log(newConversation)
    res.send(newConversation)
    
}
console.log(conversation)
res.send(conversation)
})

module.exports = router
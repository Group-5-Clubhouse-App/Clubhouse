const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.users.findUnique({ where: {username} });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try{
  const existingUser = await prisma.users.findUnique({ where: { username } });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await prisma.users.create({
    data: {
      username,
      password: hashedPassword
    }
  });

  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(201).json({token, newUser});
} catch(err){
  res.status(500).json({ message: 'Server error' });
}
});

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

router.delete('/delete', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    await prisma.users.delete({
      where: { 
        id: userId,
      }
  });
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error( 'Error deleting account:', error);
    res.status(500).json({ message: 'Error deleting account', error: error.message});
  }
});

module.exports = router;
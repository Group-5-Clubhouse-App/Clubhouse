const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword
    }
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(201).json({token, newUser});
});

module.exports = router;
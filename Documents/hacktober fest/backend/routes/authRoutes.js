// backend/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ensure this path is correct

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password, favoriteTeam } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      favoriteTeam,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

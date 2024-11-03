// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
  },
  password: {
    type: String,
    required: true,
  },
  favoriteTeam: {
    type: String,
    required: true, // Optional: Set to false if you want it to be optional
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

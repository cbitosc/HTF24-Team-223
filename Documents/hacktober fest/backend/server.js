// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Adjust the path as needed

const app = express();
const dbURI = "mongodb+srv://sohansurabhi2:RllD1FogQhiUFCbG@cluster0.oig1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use('/api', authRoutes); // Mounting auth routes under /api

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(6000, () => { // Ensure you're listening on the right port
      console.log('Server is running on port 6000');
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

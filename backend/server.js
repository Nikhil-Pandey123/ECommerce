const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware (optional for this test)
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    // Start server only if DB connects
    app.listen(5000, () => {
      console.log('🚀 Server is running on http://localhost:5000');
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  });

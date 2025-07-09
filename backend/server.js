import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
// Load environment variables
dotenv.config();

const app = express();

// Use CORS middleware
app.use(cors());

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

// Routes
app.use('/api/users', authRoutes);

app.use('/api/contact', contactRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    // Start server only if DB connects
    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

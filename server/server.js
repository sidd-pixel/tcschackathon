// server.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const userModel = require('./models/userModel');

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
async function startServer() {
  await userModel.connectToDatabase();

  // Use user routes
  app.use('/api', userRoutes);

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}

startServer();

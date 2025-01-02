// config/dbConfig.js
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

module.exports = {
  mongoURI: process.env.MONGODB_URI, // The MongoDB connection URI from the .env file
};

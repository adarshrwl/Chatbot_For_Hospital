const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
require("dotenv").config();

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/chat", require("./api/chatRoutes")); // For chatbot queries



// Load environment variables
require("dotenv").config();

// Port setup
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;

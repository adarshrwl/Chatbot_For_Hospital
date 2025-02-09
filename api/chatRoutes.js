const express = require("express");
const { getChatResponse } = require("../controllers/chatController");

const router = express.Router();

// Route for chatbot queries (stateless)
router.post("/", getChatResponse);

module.exports = router;

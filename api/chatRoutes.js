const express = require("express");
const { getChatResponse } = require("../controllers/chatController");

const router = express.Router();

// POST route to handle chatbot queries
router.post("/", getChatResponse);

module.exports = router;

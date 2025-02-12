// routes/chatLogRoutes.js
const express = require("express");
const router = express.Router();
const chatLogController = require("../controllers/chatLogController");

// GET endpoint to fetch all chat logs
router.get("/", chatLogController.getChatLogs);

module.exports = router;

// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST endpoint for the chatbot
router.post('/', chatController.chat);

module.exports = router;

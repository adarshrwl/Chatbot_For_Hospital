// controllers/chatLogController.js
const ChatLog = require("../models/Chat");

exports.getChatLogs = async (req, res) => {
  try {
    // Fetch all chat logs sorted by creation date (newest first)
    const logs = await ChatLog.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving chat logs", error: error.message });
  }
};

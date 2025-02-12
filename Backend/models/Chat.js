// models/Chat.js
const mongoose = require("mongoose");

const chatLogSchema = new mongoose.Schema({
  query: { type: String, required: true },
  reply: { type: String, required: true },
  // Optional: if you have user info from auth, store a reference:
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatLog", chatLogSchema);

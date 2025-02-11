const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Plain-text password handled in the controller
    role: {
      type: String,
      enum: ["admin", "frontdesk", "chatbot"],
      default: "frontdesk",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("User", userSchema);

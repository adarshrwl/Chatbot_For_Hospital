const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./config/db");

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies or headers like Authorization
  })
);

// Connect to the database
connectdb();

// Import routes
const doctorRoutes = require("./routes/doctorRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes"); // New chat route
const chatLogRoutes = require("./routes/chatLogRoutes"); 

// Mount the routes on specific paths
app.use("/api/doctors", doctorRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes); // Chat endpoint
app.use("/api/chat/logs", chatLogRoutes)
// Optional Error handling middleware (uncomment if needed)
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: err.message });
// });

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

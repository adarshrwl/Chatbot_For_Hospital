const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// Import routes
const doctorRoutes = require("./routes/doctorRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");

// Mount the routes on specific paths
app.use("/api/doctors", doctorRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

// Optional Error handling middleware
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: err.message });
// });

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authenticate = require("../middleware/authenticate"); // Import authentication middleware
const authorize = require("../middleware/authorize");

// Create a new appointment - only admin & frontdesk
router.post(
  "/",
  authenticate,
  authorize(["admin", "frontdesk"]),
  appointmentController.createAppointment
);

// Retrieve all appointments - allowed for admin, frontdesk, & chatbot
router.get(
  "/",
  authenticate,
  authorize(["admin", "frontdesk", "chatbot"]),
  appointmentController.getAllAppointments
);

// Retrieve a single appointment by ID - allowed for admin, frontdesk, & chatbot
router.get(
  "/:id",
  authenticate,
  authorize(["admin", "frontdesk", "chatbot"]),
  appointmentController.getAppointmentById
);

// Update an appointment by ID - only admin & frontdesk
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "frontdesk"]),
  appointmentController.updateAppointment
);

// Delete an appointment by ID - only admin & frontdesk
router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "frontdesk"]),
  appointmentController.deleteAppointment
);

module.exports = router;

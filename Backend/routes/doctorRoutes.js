const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Create a new doctor - only admin
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  doctorController.createDoctor
);

// Retrieve all doctors - allowed for admin & chatbot
router.get(
  "/",
  authenticate,
  authorize(["admin", "chatbot"]),
  doctorController.getAllDoctors
);

// Retrieve a single doctor by ID - allowed for admin & chatbot
router.get(
  "/:id",
  authenticate,
  authorize(["admin", "chatbot"]),
  doctorController.getDoctorById
);

// Update a doctor by ID - only admin
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  doctorController.updateDoctor
);

// Delete a doctor by ID - only admin
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  doctorController.deleteDoctor
);

module.exports = router;

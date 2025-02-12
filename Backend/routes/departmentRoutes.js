const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const authorize = require("../middleware/authorize");
const authenticate = require("../middleware/authenticate"); // Import the authenticate middleware

// Apply authenticate middleware before authorize middleware
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  departmentController.createDepartment
);
router.get(
  "/",
  authenticate,
  authorize(["admin", "chatbot"]),
  departmentController.getAllDepartments
);
router.get(
  "/:id",
  authenticate,
  authorize(["admin", "chatbot"]),
  departmentController.getDepartmentById
);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  departmentController.updateDepartment
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  departmentController.deleteDepartment
);

module.exports = router;

const Doctor = require("../models/Doctor");
const Department = require("../models/Department");
const mongoose = require("mongoose");
exports.createDoctor = async (req, res) => {
  console.log("Incoming request body:", req.body);
  try {
    const { name, specialization, departmentId } = req.body;

    // Validate if departmentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({ error: "Invalid departmentId" });
    }

    // Find the department by ID
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // Create a new doctor
    const newDoctor = await Doctor.create({
      name,
      specialization,
      department: departmentId,
    });

    res.status(201).json({ success: true, doctor: newDoctor });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ error: "Failed to create doctor" });
  }
};
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("department");
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error retrieving doctors:", error); // Debug log
    res.status(500).json({ message: "Error retrieving doctors", error });
  }
};

// Retrieve a single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("department");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving doctor", error });
  }
};

// Update a doctor by ID
exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error });
  }
};

// Delete a doctor by ID
exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error });
  }
};

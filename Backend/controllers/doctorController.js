const Doctor = require("../models/Doctor");

// Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor", error });
  }
};

// Retrieve all doctors (with department populated)
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("department");
    res.status(200).json(doctors);
  } catch (error) {
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

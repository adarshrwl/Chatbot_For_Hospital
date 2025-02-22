const Appointment = require("../models/Appointment");

// Create a new appointment
// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      patientContact,
      patientAge,
      patientGender,
      symptoms,
      doctor,
      appointmentTime,
      status,
    } = req.body;

    const newAppointment = await Appointment.create({
      patientName,
      patientContact,
      patientAge,
      patientGender,
      symptoms,
      doctor,
      appointmentTime,
      status,
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

// Retrieve all appointments (with doctor populated)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctor");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointments", error });
  }
};

// Retrieve a single appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "doctor"
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointment", error });
  }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

// Delete an appointment by ID
// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};

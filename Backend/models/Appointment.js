const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    patientName: { type: String, required: true },
    patientContact: { type: String, required: true }, // New field
    patientAge: { type: Number, required: true }, // New field
    patientGender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    }, // New field
    symptoms: { type: String, required: true }, // New field
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    appointmentTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);

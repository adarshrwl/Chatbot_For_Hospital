const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    patientName: { type: String, required: true },
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

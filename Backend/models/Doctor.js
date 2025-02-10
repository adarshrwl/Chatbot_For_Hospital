const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    schedule: [
      {
        day: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    contact: {
      email: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);

const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollno: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    portalId: {
      type: mongoose.Schema.ObjectId,
      ref: "Portal",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Attendance", attendanceSchema)

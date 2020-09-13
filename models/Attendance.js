const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema(
  {
    name: String,
    rollno: String,
    courseCode: String,
    class: String,
    portalId: {
      type: mongoose.Schema.ObjectId,
      ref: "Portal",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Attendance", attendanceSchema)

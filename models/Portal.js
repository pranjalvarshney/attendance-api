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
  },
  { timestamps: true }
)

const portalSchema = new mongoose.Schema(
  {
    teacherId: {
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
    status: {
      type: Boolean,
      default: true,
    },
    secret: {
      type: String,
      required: true,
    },
    attendance: [
      {
        type: attendanceSchema,
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Portal", portalSchema)

const mongoose = require("mongoose")

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
  },
  { timestamps: true }
)

module.exports = mongoose.model("Portal", portalSchema)

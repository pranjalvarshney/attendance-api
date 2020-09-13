const mongoose = require("mongoose")

const portalSchema = new mongoose.Schema(
  {
    teacherId: String,
    courseCode: String,
    class: String,
    status: {
      type: Boolean,
      default: true,
    },
    secret: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model("Portal", portalSchema)

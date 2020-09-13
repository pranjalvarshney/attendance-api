const express = require("express")
const {
  markAttendance,
  getAttendanceById,
  getAttendance,
  showAllAttendance,
  getAllAttendanceByPortalId,
} = require("../controllers/attendance")
const { getPortalById } = require("../controllers/portal")
const router = express.Router()

router.param("attendance", getAttendanceById)
router.param("portal", getPortalById)

router.get("/attendance/:attendance", getAttendance)
router.get("/show/all/attendance", showAllAttendance)

router.get("/show/all/attendance/portal/:portalId", getAllAttendanceByPortalId)

router.post("/mark/attendance", markAttendance)

module.exports = router

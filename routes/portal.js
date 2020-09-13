const express = require("express")
const {
  createPortal,
  getPortalById,
  getPortal,
  getAllPortals,
  closePortal,
} = require("../controllers/portal")
const router = express.Router()

//param
router.param("portalId", getPortalById)

router.get("/show/portal/:portalId", getPortal)
router.get("/show/portals", getAllPortals)
router.post("/generate/attendance/portal", createPortal)
router.put("/close/attendance/portal/:portalId", closePortal)

module.exports = router

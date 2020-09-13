const Portal = require("../models/Portal")
const speakeasy = require("speakeasy")

exports.getPortalById = (req, res, next, id) => {
  Portal.findById(id).exec((err, portal) => {
    if (err || !portal) {
      return res.status(400).json("An error occured!")
    }
    req.portal = portal
    next()
  })
}

exports.getPortal = (req, res) => {
  return res.json(req.portal)
}

exports.getAllPortals = (req, res) => {
  Portal.find().exec((err, portals) => {
    if (err || !portals) {
      return res.status(400).json("An error occured!")
    }
    res.json(portals)
  })
}

exports.createPortal = (req, res) => {
  var otp = speakeasy.totp({
    secret: req.body.secret,
    encoding: "base32",
    step: 180,
    // window: 6,
  })
  Portal.create(req.body, (err, portal) => {
    if (err) {
      return res.status(400).json("An error occured!")
    }
    res.json({ otp, portal })
  })
}

exports.closePortal = (req, res) => {
  Portal.findOneAndUpdate(
    {
      _id: req.portal._id,
    },
    {
      $set: { status: false },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, portal) => {
      if (err) {
        return res.status(400).json("Error in updating")
      }
      res.json(portal)
    }
  )
}

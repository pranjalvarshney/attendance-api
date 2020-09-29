const Portal = require("../models/Portal")
const speakeasy = require("speakeasy")
const { json } = require("express")

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
    step: 300,
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
exports.openPortal = (req, res) => {
  Portal.findOneAndUpdate(
    {
      _id: req.portal._id,
    },
    {
      $set: { status: true },
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

exports.findPortalByDate = (req, res) => {
  Portal.find({
    courseCode: req.query.coursecode,
    class: req.query.class,
  }).exec((err, portal) => {
    if (err) {
      return res.status(400).json(err)
    }

    if (portal.length === 0) {
      return res.status(400).json("No data found")
    }

    if (!req.query.date) {
      // console.log("1")
      return res.json(portal)
    } else {
      portal.map((p) => {
        if (!(p.createdAt.toISOString().slice(0, 10) === req.query.date)) {
          // console.log("2")
          return res.json(`No Portal found with date ${req.query.date}`)
        } else {
          // console.log("3")
          return res.json(p)
        }
      })
    }
  })
}

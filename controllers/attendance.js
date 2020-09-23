const Attendance = require("../models/Attendance")
const speakeasy = require("speakeasy")
const Portal = require("../models/Portal")

exports.getAttendanceById = (req, res, next, id) => {
  Attendance.findById(id)
    .populate("portalId")
    .exec((err, attendance) => {
      if (err) {
        return res.status(400).json("Error!")
      }
      req.attendance = attendance
      next()
    })
}

exports.getAttendance = (req, res) => {
  return res.json(req.attendance)
}

exports.markAttendance = (req, res) => {
  Portal.findOne(
    {
      courseCode: req.body.courseCode,
      class: req.body.class,
      status: true,
    },
    (err, portal) => {
      if (err || !portal) {
        return res.status(400).json("Invalid class or course code")
      }
      // console.log(portal.secret)
      const tokenValidates = speakeasy.totp.verify({
        secret: portal.secret,
        encoding: "base32",
        token: req.body.otp,
        step: 300,
        // window: 6, // will be valid for 6*30 - 180  seconds
      })
      if (tokenValidates) {
        Portal.findOneAndUpdate(
          { _id: portal._id },
          {
            $push: {
              attendance: {
                name: req.body.name,
                rollno: req.body.rollno,
                courseCode: req.body.courseCode,
                class: req.body.class,
              },
            },
          },
          {
            new: true,
            useFindAndModify: false,
          },
          (err, updatedPortal) => {
            if (err) {
              return res.status(400).json({
                error: "An error occured",
                err,
              })
            }
            res.json(updatedPortal)
          }
        )
        // Attendance.create(
        //   {
        //     name: req.body.name,
        //     courseCode: req.body.courseCode,
        //     class: req.body.class,
        //     rollno: req.body.rollno,
        //     portalId: portal._id,
        //   },
        //   (err, attendance) => {
        //     if (err) {
        //       return res.status(400).json({
        //         error: "An error occured",
        //         err,
        //       })
        //     }
        //     res.status(200).json(attendance)
        //   }
        // )
      } else {
        res.json("Invalid OTP")
      }
    }
  )
}

exports.showAllAttendance = (req, res) => {
  Attendance.find()
    .select("-_id -portalId -courseCode -class -createdAt -updatedAt -__v")
    .exec((err, atts) => {
      if (err) {
        return res.status(400).json("No data found! Error!")
      }
      res.status(200).json({ students: atts })
    })
}

exports.getAllAttendanceByPortalId = (req, res) => {
  const portal = req.portal
  Attendance.find({ portalId: portal._id })
    .populate("portalId")
    .exec((err, att) => {
      if (err) {
        return res.status(400).json("Error! Database")
      }
      res.json(att)
    })
}

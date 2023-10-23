const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("testimonial", {
    layout: "index",
    active: { Testimonial: true },
    isLogin: req.session.isLogin,
    user: req.session.user,
  })
})

module.exports = router

const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("contact", {
    layout: "index",
    isLogin: req.session.isLogin,
    user: req.session.user,
  })
})

module.exports = router

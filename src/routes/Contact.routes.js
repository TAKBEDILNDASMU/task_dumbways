const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("contact", { layout: "index" })
})

module.exports = router

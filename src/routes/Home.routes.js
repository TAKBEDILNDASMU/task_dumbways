const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("index", { layout: "index", active: { Home: true } })
})

module.exports = router

const express = require("express")
const router = express.Router()
const cors = require("cors")

let testimonials = require("../mocks/testimonials.json")

router.get("/testimonial", cors(), (req, res) => {
  res.json(testimonials)
})

module.exports = router

const express = require("express")
const router = express.Router()

const { getHome } = require("../controllers/Home.controller")

router.get("/", getHome)

module.exports = router

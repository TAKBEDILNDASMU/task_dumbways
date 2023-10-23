const express = require("express")
const router = express.Router()
const {
  register,
  store,
  login,
  authenticate,
  logout,
  coba,
} = require("../controllers/User.controller")

router.get("/register", register)

router.post("/register", store)

router.get("/login", login)

router.post("/login", authenticate)

router.post("/logout", logout)

module.exports = router

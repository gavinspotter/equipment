const express = require("express")

const usersController = require("../controllers/user-controller")

const router = express.Router()

router.post("/signup", usersController.signup)

router.post("/login")

module.exports = router


const express = require("express")

const usersController = require("../controllers/user-controller")

const router = express.Router()

router.post("/signup", usersController.signup)

router.post("/login", usersController.login)

router.post("/takeEquipment", usersController.takeEquipment)

module.exports = router


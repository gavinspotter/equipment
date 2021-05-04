const express = require("express")

const usersController = require("../controllers/user-controller")


const router = express.Router()


const checkAuth = require('../middleware/check-auth');

router.post("/signup", usersController.signup)

router.post("/login", usersController.login)


router.use(checkAuth);

router.get("/:getCompanys")

router.post("/setEquipmentBack", usersController.setEquipmentBack)

router.post("/addUserToEquipment", usersController.addUserToEquipment)

router.post("/takeEquipment", usersController.takeEquipment)

module.exports = router


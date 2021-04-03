const express = require("express")

const companyController = require("../controllers/company-controller")


const router = express.Router()

router.post("/signup", companyController.signup)

router.post("/login", companyController.login)

module.exports = router
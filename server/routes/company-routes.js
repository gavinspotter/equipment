const express = require("express")

const companyController = require("../controllers/company-controller")


const router = express.Router()

router.post("/signup", companyController.signup)

module.exports = router
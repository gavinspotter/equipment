const express = require("express")

const companyController = require("../controllers/company-controller")


const router = express.Router()


const checkAuth = require('../middleware/check-auth');

router.post("/signup", companyController.signup)

router.post("/login", companyController.login)


router.use(checkAuth);




module.exports = router
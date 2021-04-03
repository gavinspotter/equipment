const HttpError = require("../models/HttpError")

const Company = require("../models/company")


const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async (req, res, next) => {

    const { username, password } = req.body

    let existingUser

}

exports.signup = signup
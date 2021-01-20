const HttpError = require("../models/HttpError")
const User = require("../models/user")

const signup = async (req, res, next) => {
    const { name, email, password } = req.body
}
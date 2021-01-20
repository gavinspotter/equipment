const HttpError = require("../models/HttpError")
const User = require("../models/user")

const signup = async (req, res, next) => {
    const { name, email, password } = req.body

    let existingUser

    try {
        existingUser = User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            "email already in use",
            500
        )
        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        password,
        company: [],
        equipment: []
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError(
            "couldnt save this action",
            500
        )
        return next(error)
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser
}

exports.signup = signup
const HttpError = require("../models/HttpError")

const Company = require("../models/company")


const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async (req, res, next) => {

    const { username, password } = req.body

    let existingUser

    try {
        existingUser = await Company.findOne({ username: username })
    } catch (err) {
        const error = new HttpError("couldnt find email", 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError("this user already exists, please login", 422)
        return next(error)
    }


    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
        );
        return next(error);
    }

    const createdCompany = new Company({
        username,
        password,
        users: [],
        equipment: []
    })

    try {
        await createdCompany.save()
    } catch (err) {
        const error = new HttpError("couldnt save to database", 500)
        return next(error)

    }

    let token;

    try {
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

}

exports.signup = signup
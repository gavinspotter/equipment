const HttpError = require("../models/HttpError")
const User = require("../models/user")

const Company = require("../models/company")
const Equipment = require("../models/equipment")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const signup = async (req, res, next) => {
    const { name, email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            "email already in use",
            500
        )
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

    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
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


    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            "login failed",
            500
        )
        return next(error)
    }

    if (!existingUser) {
        const error = new HttpError(
            "wrong information",
            401
        )
        return next(error)
    }

    let isValidPassword = false

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please check your credentials and try again.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let token;

    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }


    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    })
}


const takeEquipment = async (req, res, next) => {

    const { timein, jobdescription, equipment } = req.body


    let findEquipment

    try {
        findEquipment = await Equipment.findById(equipment)
    } catch (err) {
        const error = new HttpError("couldnt find equpiment", 500)
        return next(error)
    }

    let findUser

    try {
        findUser = await User.findById(req.userData.userId)
    } catch (err) {
        const error = new HttpError("youre not logged in", 500)
        return next(error)
    }

    const findCompanyId = findUser.company.filter(x => x == findEquipment.company)

    if (!findCompanyId) {
        const error = new HttpError("user doesnt have access to that equipment")
        return next(error)
    }

    let checkIfEquipmentIsOut


    try {
        checkIfEquipmentIsOut = await User.find({ equipment: findEquipment.id })
    } catch (err) {
        const error = new HttpError("couldnt find equipment in user")
        return next(error)
    }

    if (checkIfEquipmentIsOut) {
        const error = new HttpError("that equipment is out")
        return next(error)
    }


    const ehistory = {
        dateOfUse: {
            in: timein
        },
        users: [req.userData.userId],
        jobDescription: jobdescription
    }

    try {
        findEquipment.eHistory.push(ehistory)
    } catch (err) {
        const error = new HttpError("couldnt add time")
        return next(error)
    }

    try {
        await findEquipment.save()
    } catch (err) {
        const error = new HttpError("save")
        return next(error)
    }

    try {
        findUser.equipment.push(findEquipment)
    } catch (err) {
        const error = new HttpError("push failed")
        return next(error)
    }

    try {
        await findUser.save()
    } catch (err) {
        const error = new HttpError("save failed")
        return next(error)
    }

    res.json({ userEquipment: findUser.equipment, equipmentTime: findEquipment.eHistory })


}

const addUserToEquipment = async (req, res, next) => {

}


exports.addUserToEquipment = addUserToEquipment
exports.takeEquipment = takeEquipment
exports.login = login;
exports.signup = signup
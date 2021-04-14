const HttpError = require("../models/HttpError")
const User = require("../models/user")

const Employee = require("../models/user")

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
        console.log(findEquipment.company)
    } catch (err) {
        const error = new HttpError("couldnt find equpiment", 500)
        return next(error)
    }

    let findUser

    try {
        findUser = await Employee.findById(req.userData.userId)
        console.log(findUser.companys)
    } catch (err) {
        const error = new HttpError("youre not logged in", 500)
        return next(error)
    }

    console.log(findUser.companys.find(z => z == `${findEquipment.company}`))

    const checkCompanyId = findUser.companys.find(z => z == `${findEquipment.company}`)






    // try {
    //     findComponyById = await findUser.company.findById(findEquipment)
    // } catch (error) {

    // }



    if (!checkCompanyId) {
        const error = new HttpError("user doesnt have access to that equipment")
        return next(error)
    }




    const checkIfEquipmentIsOut = findUser.equipment.find(x => x == `${findEquipment.id}`)

    if (checkIfEquipmentIsOut) {
        const error = new HttpError("you already have that equipment")
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

    const { equipment, ehistory } = req.body

    let findUser

    try {
        findUser = await User.findById(req.userData.userId)
    } catch (err) {
        const error = new HttpError("couldnt find user")
        return next(error)
    }

    if (!findUser) {
        const error = new HttpError("thats not a user")
        return next(error)
    }


    let findEquipment

    try {
        findEquipment = await Equipment.findById(equipment)
    } catch (err) {
        const error = new HttpError("couldnt find equipment")
        return next(error)
    }

    if (!findEquipment) {
        const error = new HttpError("thats not a piece of equipment")
        return next(error)
    }

    const findEhistory = findEquipment.eHistory.find(x => x.id == ehistory)

    const checkUser = findEhistory.users.find(x => x == findUser.id)

    if (checkUser) {
        const error = new HttpError("you already have that equipment out")
        return next(error)
    }

    try {
        findEhistory.users.push(findUser.id)
    } catch (err) {
        const error = new HttpError("couldnt add to array")
        return next(error)
    }

    try {
        await findEquipment.save()
    } catch (err) {
        const error = new HttpError("couldnt save ")
        return next(error)
    }




    res.json({ history: findEhistory })





}


exports.addUserToEquipment = addUserToEquipment
exports.takeEquipment = takeEquipment
exports.login = login;
exports.signup = signup
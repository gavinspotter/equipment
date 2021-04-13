const HttpError = require("../models/HttpError")

const Company = require("../models/company")

const Equipment = require('../models/equipment')

const Employee = require('../models/user')


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
        password: hashedPassword,
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
            { userId: createdCompany.id, username: createdCompany.username },
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

    res.status(201).json({ userId: createdCompany.id, username: createdCompany.username, token: token })


}

const login = async (req, res, next) => {
    const { username, password } = req.body

    let existingUser

    try {
        existingUser = await Company.findOne({ username: username })
    } catch (err) {
        const error = new HttpError("couldnt find company username", 500)
        return next(error)
    }

    if (!existingUser) {
        const error = new HttpError(
            "this isnt a user",
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
            { userId: existingUser.id, username: existingUser.username },
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
        username: existingUser.username,
        token: token
    })

}

const createEquipment = async (req, res, next) => {

    const { name } = req.body

    const createdEquipment = new Equipment(
        {
            name: name,
            company: req.userData.userId,

        }
    )

    let company

    try {
        company = await Company.findById(req.userData.userId)
    } catch (err) {
        const error = new HttpError("couldnt find company by id", 500)
        return next(error)
    }

    if (!company) {
        const error = new HttpError("couldnt find a company for that id", 404)
        return next(error)
    }

    try {
        await createdEquipment.save()
    } catch (err) {
        // const error = new HttpError("couldnt save equipment", 500)
        // return next(error)
    }

    try {
        company.equipment.push(createdEquipment)
    } catch (err) {
        const error = new HttpError("couldnt add equipment to company", 500)
        return next(error)
    }


    try {
        await company.save()
    } catch (err) {
        const error = new HttpError("couldnt save equipment to company", 500)
        return next(error)
    }

    res.status(201).json({ equipment: createdEquipment })


}



const addUserToCompany = async (req, res, next) => {

    const { email } = req.body

    let findEmail

    try {
        findEmail = await Employee.findOne({ email: email })
    } catch (err) {
        const error = new HttpError("couldnt find user by email", 500)
        return next(error)
    }

    let snatchCompany

    try {
        snatchCompany = await Company.findById(req.userData.userId)
    } catch (err) {
        const error = new HttpError("could find company by id", 500)
        return next(error)
    }

    const ace = snatchCompany.employees.find(x => x == findEmail.id)

    if (ace) {
        const error = new HttpError("this is already an employee of your company", 500)
        return next(error)
    }

    try {
        snatchCompany.employees.push(findEmail)
    } catch (err) {
        const error = new HttpError("couldnt add employee", 500)
        return next(error)
    }

    try {
        await snatchCompany.save()
    } catch (err) {
        const error = new HttpError("couldnt save", 500)
        return next(error)
    }

    try {
        findEmail.company.push(snatchCompany)
    } catch (err) {
        const error = new HttpError("couldnt add company", 500)
        return next(error)
    }

    try {
        await findEmail.save()
    } catch (err) {
        const error = new HttpError("couldnt save company", 500)
        return next(error)
    }

    res.json({ company: snatchCompany.employees, user: findEmail.company })
}



exports.addUserToCompany = addUserToCompany
exports.createEquipment = createEquipment
exports.login = login
exports.signup = signup
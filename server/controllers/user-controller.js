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
        // console.log(findEquipment.company)
    } catch (err) {
        const error = new HttpError("couldnt find equpiment", 500)
        return next(error)
    }

    let findUser

    try {
        findUser = await Employee.findById(req.userData.userId)
        // console.log(findUser.companys)
    } catch (err) {
        const error = new HttpError("youre not logged in", 500)
        return next(error)
    }

    // console.log(findUser.companys.find(z => z == `${findEquipment.company}`))

    const checkCompanyId = findUser.companys.find(z => z == `${findEquipment.company}`)






    // try {
    //     findComponyById = await findUser.company.findById(findEquipment)
    // } catch (error) {

    // }
    //const checkForOtherUsersIfEquipmentIsOut = findEquipment.eHistory[findEquipment.eHistory.length - 1].dateOfUse.out

    //console.log(checkForOtherUsersIfEquipmentIsOut)



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
            in: timein,

        },
        users: [req.userData.userId],
        jobDescription: jobdescription
    }


    if (findEquipment.eHistory.length > 0) {
        const equipmentIsOut = findEquipment.eHistory[findEquipment.eHistory.length - 1].dateOfUse.out
        if (!findEquipment.eHistory.length === 0 || !equipmentIsOut) {
            const error = new HttpError("another user has that equipment")
            return next(error)
        }

    }




    try {
        findEquipment.eHistory.push(ehistory)
    } catch (err) {
        const error = new HttpError("couldnt add time")
        return next(error)
    }


    // console.log(findEquipment.eHistory[findEquipment.eHistory.length - 1]._id)



    try {
        findUser.equipmentTimes.push(findEquipment.eHistory[findEquipment.eHistory.length - 1]._id)
    } catch (err) {
        const error = new HttpError("doesnt have an id")
        return next(error)
    }

    try {
        findUser.equipment.push(findEquipment)
    } catch (err) {
        const error = new HttpError("push failed")
        return next(error)
    }

    try {
        await findEquipment.save()
    } catch (err) {
        const error = new HttpError("save")
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
        findUser.equipment.push(findEquipment.id)
    } catch (err) {
        const error = new HttpError("couldnt add equipment")
        return next(error)
    }

    try {
        findUser.equipmentTimes.push(findEhistory)
    } catch (err) {
        const error = new HttpError("couldnt add time")
        return next(error)
    }

    try {
        await findEquipment.save()
    } catch (err) {
        const error = new HttpError("couldnt save ")
        return next(error)
    }

    try {
        findUser.save()
    } catch (err) {
        const error = new HttpError("couldnt save equipment")
        return next(error)
    }




    res.json({ history: findEhistory, user: findUser })





}

const setEquipmentBack = async (req, res, next) => {

    const { equipment, ehist, putback } = req.body

    let findEquipment



    try {
        findEquipment = await Equipment.findById(equipment)
    } catch (err) {
        const error = new HttpError("couldnt find equipment by id")
        return next(error)
    }


    const findEquipmentHistory = findEquipment.eHistory.find(x => x.id == ehist)


    findEquipmentHistory.dateOfUse.out = putback





    let findUser

    try {
        findUser = await Employee.find({ equipment: equipment })
    } catch (err) {
        const error = new HttpError("couldnt find a user with that equipment")
        return next(error)
    }

    //const pullEquipment = findUser.map(x => x.equipment.find(z => z == equipment))


    try {
        findUser.forEach(a => a.equipment.pull(equipment))


    } catch (err) {
        console.log(err)
        const error = new HttpError("couldnt remove equipment")
        return next(error)
    }

    try {
        await findEquipment.save()
    } catch (err) {
        const error = new HttpError("couldnt save to database")
        return next(error)
    }

    try {

        await findUser.forEach(a => a.save())
    } catch (err) {
        console.log(err)
        const error = new HttpError("couldnt save removal")
        return next(error)
    }





    // try {
    //     await Equipment.updateOne({ ehist }, { $set: { back: "time" } })
    // } catch (err) {

    // }

    res.json({ findEquipmentHistory, user: findUser })

}

const getUserCompanys = async (req, res, next) => {

    let findUser

    try {
        findUser = await Employee.findById(req.userData.userId)
    } catch (err) {
        const error = new HttpError("user isnt authenticated")
        return next(error)
    }

    let listOfCompanys

    // let acompany

    // try {

    //     listOfCompanys = findUser.companys.map(async z => await Company.findById(z))



    // } catch (err) {
    //     const error = new HttpError("couldnt list the companys")
    //     return next(error)

    // }

    try {
        listOfCompanys = await Company.find({ _id: findUser.companys }, "username && _id")
    } catch (err) {
        const error = new HttpError("couldnt find companys by id")
        return next(error)
    }

    // let companyUsername

    // try {
    //     companyUsername = await listOfCompanys.map(z => z.username)
    // } catch (err) {
    //     const error = new HttpError("cant list companys")
    //     return next(error)
    // }


    res.json({ listOfCompanys })

}


const listEquipment = async (req, res, next) => {

    const companyId = req.params.companyId

    let findUser

    try {
        findUser = await Employee.findById(req.userData.userId)
    } catch (err) {
        const error = new HttpError("couldnt find authenticated user")
        return next(error)
    }

    const findCompanyId = findUser.companys.find(x => x == companyId)

    if (!findCompanyId) {
        const error = new HttpError("thats not one of your companys")
        return next(error)
    }

    let getCompany

    try {
        getCompany = await Company.findById(findCompanyId)
    } catch (err) {
        const error = new HttpError("couldnt find company by id")
        return next(error)
    }

    let getEquipment

    try {
        getEquipment = await Equipment.find({ _id: getCompany.equipment })
    } catch (err) {
        const error = new HttpError("couldnt find equipment")
        return next(error)
    }

    // const outAce = getEquipment.forEach(z => z.eHistory.forEach(x => x.dateOfUse.out))

    // if (outAce) {
    //     res.json({ getEquipment })
    // } else {
    //     const error = new HttpError("that equipment is out")
    //     return next(error)
    // }


    //console.log(getEquipment)


    const getRestingEquip = getEquipment.filter(x => x.eHistory[x.eHistory.length - 1].dateOfUse.out)

    //console.log(getRestingEquip)

    res.json({ getRestingEquip })

}

const getCompany = async (req, res, next) => {

    const companyId = req.params.companyId

    let findUser

    try {
        findUser = await Employee.findById(req.userData.userId)
    } catch (err) {
        const error = new HttpError("couldnt find authenticated user")
        return next(error)
    }

    const findCompanyId = findUser.companys.find(x => x == companyId)

    if (!findCompanyId) {
        const error = new HttpError("thats not one of your companys")
        return next(error)
    }

    let getCompany

    try {
        getCompany = await Company.findById(findCompanyId, "-password")
    } catch (err) {
        const error = new HttpError("couldnt find company by id")
        return next(error)
    }


    let findEmployees

    try {
        findEmployees = await Employee.find({ _id: getCompany.employees }, "name && email")
    } catch (err) {
        const error = new HttpError("couldnt find employees")
    }

    res.json({ getCompany, findEmployees })




}

const getCompanysInEquipment = async (req, res, next) => {

    const companyId = req.params.companyid

    let findUser

    try {
        findUser = await Employee.findById(req.userData.userId)
    } catch (err) {
        const error = new HttpError("user isnt authenticated")
        return next(error)
    }

    let findCompany

    try {
        findCompany = await Company.findById(companyId)
    } catch (err) {
        const error = new HttpError("couldnt find company by id")
        return next(error)
    }

    let outEquipment

    try {
        outEquipment = await Equipment.find({ _id: findCompany.equipment })
    } catch (err) {
        const error = new HttpError("couldnt find equipment with company id")
        return next(error)
    }

    outEquipment.forEach(z => z.eHistory.forEach)

    res.json({ outEquipment })


}

exports.getCompanysInEquipment = getCompanysInEquipment
exports.getCompany = getCompany
exports.listEquipment = listEquipment
exports.getUserCompanys = getUserCompanys
exports.setEquipmentBack = setEquipmentBack
exports.addUserToEquipment = addUserToEquipment
exports.takeEquipment = takeEquipment
exports.login = login;
exports.signup = signup
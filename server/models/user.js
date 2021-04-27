const mongoose = require("mongoose")

const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companys: [{ type: mongoose.Types.ObjectId, required: true, ref: "Company" }],
    equipment: [{ type: mongoose.Types.ObjectId, required: true, ref: "Equipment" }],
    equipmentTimes: [{ type: mongoose.Types.ObjectId, required: true, ref: "Ehistory" }]
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)
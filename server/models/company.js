const mongoose = require("mongoose")

const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema

const companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    equipment: [{ type: mongoose.Types.ObjectId, required: true, ref: "Equipment" }],
    employees: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }]
})

companySchema.plugin(uniqueValidator)

module.exports = mongoose.model("Company", companySchema)
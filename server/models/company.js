const mongoose = require("mongoose")

const uniqueValidator = require("mongoose")

const Schema = mongoose.Schema

const companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    equipment: [{ type: mongoose.Types.ObjectId, required: true }],
    employees: [{ type: mongoose.Types.ObjectId, required: true }]
})
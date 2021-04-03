const mongoose = require("mongoose")

const Schema = mongoose.Schema

const equipmentHistorySchema = new Schema({
    dateOfUse: { type: String, required: true },
    users: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
    jobDescription: { type: String, required: true }
})

const equipmentSchema = new Schema({
    name: { type: String, required: true },
    company: { type: mongoose.Types.ObjectId, required: true, ref: "Company" },
    eHistory: [equipmentHistorySchema]

})

const equipmentHistoryOID = mongoose.model("Ehistory", equipmentHistoryOID)

module.exports = mongoose.model("Equipment", equipmentSchema)
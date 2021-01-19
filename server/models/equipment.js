const mongoose = require("mongoose")

const Schema = mongoose.Schema

const equipmentSchema = new Schema({
    name: { type: String, required: true },
    company: { type: mongoose.Types.ObjectId, required: true },
    users: [{ type: mongoose.Types.ObjectId, required: true }],
    ehistory: [{ type: Date, required: true },
    [{ type: mongoose.Types.ObjectId, required: true }]
    ]
})

module.exports = mongoose.model("Equipment", equipmentSchema)
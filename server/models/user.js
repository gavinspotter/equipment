const mongoose = require("mongoose")

const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    company: [{ type: mongoose.Types.ObjectId, required: true, ref: "Company" }],
    equipment: [{ type: Date, required: true },
    { type: mongoose.Types.ObjectId, required: true, ref: "Equipment" }
    ]
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)
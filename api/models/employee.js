const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    preferred_name: String,
    position: String,
    birthday: Date,
    email: String
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

module.exports = schema
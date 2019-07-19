const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    preferred_name: String,
    position: String,
    birthday: Date,
    email: String,
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Employee', schema)
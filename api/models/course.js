const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    start_date: Date,
    end_date: Date,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Course', schema)
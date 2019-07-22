const mongoose = require('mongoose')

const Company = require('./company')

const schema = new mongoose.Schema({
    kind: String,
    floor: Number,
    companies: [Company]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Unit', schema)
const mongoose = require('mongoose')
const companySchema = require('./company')

const schema = new mongoose.Schema({
    kind: String,
    floor: Number,
    companies: [companySchema]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Unit', schema)
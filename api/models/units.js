const mongoose = require('mongoose')

const Company = require('./companies')

const schema = new mongoose.Schema({
    kind: {type: String, required: true},
    floor: {type: Number, required: true},
    company: [Company]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Unit', schema)
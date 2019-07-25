const mongoose = require('mongoose')
const employeeSchema = require('./employee').schema;

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact_email: {
        type: String,
        required: true
    },
    employees: employeeSchema
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Company', schema)
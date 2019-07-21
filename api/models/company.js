const mongoose = require('mongoose')
const employeeSchema = require('./employee')

const schema = new mongoose.Schema({
    name: String,
    contact_email: String,
    employees: [employeeSchema]
})

module.exports = schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const employeeSchema = require('./employee').schema

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact_email: {
    type: String,
    required: true,
    match: /^\w+@\w+\.[a-z]*$/
  },
  employees: [employeeSchema]
  }, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


module.exports = mongoose.model('Company', CompanySchema)

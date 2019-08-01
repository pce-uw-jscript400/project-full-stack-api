const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    match: /^\w+@\w+\.[a-z]*$/
  }
})

module.exports = mongoose.model('Employee', EmployeeSchema)

const mongoose = require('mongoose');
const validators = require('../validators/validators');
const Schema = mongoose.Schema;

const employeesSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  preferred_name:{
    type: String,
  },
  position: {
    type: String,
  },
  birthday: {
    type: String,
    validate: {
      validator: (input) => {
        return /\d{2}-\d{2}-\d{4}/.test(input);
      },
      msg: `Birthday must be a string in the format mm-dd-yyyy`
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (input) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
          return (true)
        } else {
          return (false)
        }
      },
      message: `Not a valid email`
    }
  },
})

module.exports = mongoose.model('Employees', employeesSchema)
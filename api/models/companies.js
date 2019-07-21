const mongoose = require('mongoose');
const validators = require('../validators/validators');
const Schema = mongoose.Schema;

const companiesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact_email: {
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
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employees'
    }
  ]
})

module.exports = mongoose.model('Companies', companiesSchema)
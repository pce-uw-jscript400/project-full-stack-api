const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  contact_email: {
    type: String,
    // validate: {
    //   validator: function(v) {
    //     return /\d{3}-\d{3}-\d{4}/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid phone number!`
    // }, https://mongoosejs.com/docs/validation.html#built-in-validators
    required: true
  }
})

module.exports = schema
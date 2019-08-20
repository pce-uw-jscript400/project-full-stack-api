const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employees = require('./employees').schema;

const companiesSchema = new Schema({
    name:  {type: String, required: true},
    contact_email: {
        type: String, 
        required: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
          }
    },
    employees: {
        type: [Employees]
    }
    }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


  module.exports = mongoose.model('Companies', companiesSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
        first_name:  {type: String, required: true},
        last_name:  {type: String, required: true},
        preferred_name:  {type: String},
        position:  {type: String},
        birthday: {type: String,},
        email: {
            type: String,
            required: true,
            validate: {
              validator: () => Promise.resolve(false),
              message: 'Email validation failed'
            }
          },    }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


  module.exports = mongoose.model('Employees', employeeSchema)
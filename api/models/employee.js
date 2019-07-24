const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Schema Notes:
 * 
 *          Employee: An employee at a given company.
 *              first_name: (Required) The given first name of the employee.
 *              last_name: (Required) The given last name of the employee.
 *              preferred_name: The preferred name (i.e. nickname) of the employee.
 *              position: The employee's title at the company.
 *              birthday: The employee's date of birth.
 *              email: (Required) An email address to contact the given employee. This should be validated so that only a valid email can be entered.
 */

 // Schema 
const employeeSchema = new Schema({
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
                birthday: String,
                email: {
                    type: String,
                    required: true
                }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

  module.exports = employeeSchema;

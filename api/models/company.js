const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = require('./employee');

/**
 * Schema Notes:
 * 
 *      Company: The company that is leasing the rentable unit.
 *          -name: (Required) The name of the company.
 *          -contact_email: (Required) An email address that is used to contact the company. This should be validated so that only a valid email can be entered.
 *          -employees: An array of the Employee resource, refer to schema in ./api/models/employee.js
 * 
 */

 // Schema 
const companySchema = new Schema({
            name: {
                type: String,
                required: true
            },
            contact_email: {
                type: String,
                required: true
            },
            employee: [employeeSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

  module.exports = companySchema;

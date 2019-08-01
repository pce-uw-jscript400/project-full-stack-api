const mongoose = require('mongoose');
const employeeSchema = require('./employees');

const schema = new mongoose.Schema({
    name: {type:String, required: true},
    contact_email: {type:String, required: true},
    employees: [employeeSchema]
});

module.exports = schema
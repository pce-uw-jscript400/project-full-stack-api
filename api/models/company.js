const mongoose = require('mongoose');
const employeeSchema = require('./employee');

const schema = new mongoose.Schema({
    name: String,
    contact_email: String,
    employees: [employeeSchema]
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = schema
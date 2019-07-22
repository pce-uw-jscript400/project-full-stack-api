const mongoose = require('mongoose')

//schema Company
const schema = new mongoose.Schema({
   name: String,
   contact_email: String,
   employees: []
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

//export model
module.exports = schema
const mongoose = require('mongoose')

//schema Company
const schema = new mongoose.Schema({
   name: {type: String, required: true},
   contact_email: {type: String, required: true}
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

//export model
module.exports = schema
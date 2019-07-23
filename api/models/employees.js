const mongoose = require('mongoose')

//schema Company
const schema = new mongoose.Schema({
   first_name: {type: String, required: true },
   last_name: { type: String, required: true },
   preferred_name: String,
   position: String,
   email: {type: String, required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

//export model
module.exports = schema
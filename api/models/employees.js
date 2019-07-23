const mongoose = require('mongoose')

//schema Company
const schema = new mongoose.Schema({
   first_name: {type: String, required: true },
   last_name: { type: String, required: true },
   preferred_name: String,
   position: String,
   email: {type: String, required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
    versionKey: { type: Number, select: false} 
})

//export model
module.exports = mongoose.model('Employee', schema)
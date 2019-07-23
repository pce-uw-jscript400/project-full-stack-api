const mongoose = require('mongoose')

//schema Company
const schema = new mongoose.Schema({
   name: {type: String, required: true},
   contact_email: {type: String, required: true}
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
    versionKey: { type: Number, select: false} 
})

//export model
module.exports = mongoose.model('Company', schema)
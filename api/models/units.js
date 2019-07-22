const mongoose = require('mongoose')

//schema
const schema = new mongoose.Schema({
    _id: '',
    kind: String,
    floor: Number,
    special_monthly_offer: Number
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

//export model
module.exports = mongoose.model('Units', schema)
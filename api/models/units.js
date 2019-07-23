const mongoose = require('mongoose')
const companySchema = require('./company')

//schema Units
const schema = new mongoose.Schema({
    kind: {type: String, required: true },
    floor: {type: Number, required: true},
    special_monthly_offer: Number,
    company: [companySchema]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

//export model
module.exports = mongoose.model('Units', schema)
const mongoose = require('mongoose')

//schema Units
const schema = new mongoose.Schema({
    kind: {type: String, required: true },
    floor: {type: Number, required: true},
    special_monthly_offer: Number
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

//export model
module.exports = mongoose.model('Units', schema)
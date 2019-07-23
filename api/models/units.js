const mongoose = require('mongoose')
// const numeral = require('numeral')

// function price (val) {
//     if (typeof val !== Number) val == '';
//     return val.numeral(1000).format('$0,0.00')
// }

//schema Units
const schema = new mongoose.Schema({
    kind: {type: String, required: true },
    floor: {type: Number, required: true},
    special_monthly_offer: Number
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
    versionKey: { type: Number, select: false} 
})

//export model
module.exports = mongoose.model('Units', schema)
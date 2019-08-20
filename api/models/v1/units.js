const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Companies = require('./companies').schema;
const Companies = require('./companies').schema;


const unitSchema = new Schema({
    kind:  {
        type: String,
        enum: [
            "seat",
            "desk", 
            "small_office",
            "large_office",
            "floor"
        ],
        required: true
    },
    floor: {type: Number, required: true},
    special_monthly_offer: {type: Number}, // paid in cents
    company: Companies
    }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Units', unitSchema)
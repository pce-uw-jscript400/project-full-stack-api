const mongoose = require('mongoose');
const companySchema = require('./company').schema;

const schema = new mongoose.Schema({
    kind: {
        type: String,
        enum: ['seat', 'desk', 'small office', 'large office', 'floor'],
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    special_monthly_offer: Number,
    company: companySchema
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Unit', schema)

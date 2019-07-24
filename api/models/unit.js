const mongoose = require('mongoose')
const companySchema = require('./company')
const Schema = mongoose.Schema

const unitSchema = new Schema({
    kind: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['seat', 'desk', 'small office', 'large office', 'floor']
    },
    floor: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: props => `${props.value} is not an integer value`
        }
    },
    special_monthly_offer: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: props => `${props.value} is not an integer value`
        }
    },
    company: companySchema
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.model('Unit', unitSchema)
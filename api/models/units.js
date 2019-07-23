const mongoose = require('mongoose')
// const companySchema = require('./company')

const schema = new mongoose.Schema({
  kind: {
    type: String,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  special_monthly_offer: Number,
  company: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Units', schema)
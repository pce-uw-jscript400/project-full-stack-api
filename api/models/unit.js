const mongoose = require('mongoose')
const Schema = mongoose.Schema
const companySchema = require('./company').schema

const UnitSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: [
      'seat',
      'desk',
      'small_office',
      'large_office',
      'floor'
    ],
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  special_monthly_offer: Number,
  company: companySchema
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


module.exports = mongoose.model('Unit', UnitSchema)

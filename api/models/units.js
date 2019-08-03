const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitsSchema = new Schema({
  kind: {
    type: String,
    required: true,
    enum: [
      "seat", 
      "desk", 
      "small office", 
      "large office", 
      "floor"
    ]    
  },
  floor: {
    type: Number,
    required: true
  },
  special_monthly_offer: {
    type: Number
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companies'
  }
})

module.exports = mongoose.model('Units', unitsSchema)
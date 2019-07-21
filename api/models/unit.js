var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var companySchema = require('./company').schema

var schema = new mongoose.Schema({
    kind: {
        type: String,
        enum: ['seat', 'desk', 'small office', 'large office', 'floor'],
        required: true
    },
    floor:{
        type: Number,
        required: true,
    },
    special_monthy_offer:{
        type: Number
    },
    company: companySchema
});

module.exports = mongoose.model('Units', schema);
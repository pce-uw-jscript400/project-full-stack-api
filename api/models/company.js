var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var employeeSchema = require('./employee').schema


var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact_email:{
        type: String,
        required: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    employees: [employeeSchema]
})

module.exports = mongoose.model('Companies', schema);
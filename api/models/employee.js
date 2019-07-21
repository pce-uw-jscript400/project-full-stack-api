var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var schema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    preferred_name:{
        type: String
    },
    position:{
        type: String
    },
    birthday:{
        type: Date
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})

module.exports = mongoose.model('employees', schema);
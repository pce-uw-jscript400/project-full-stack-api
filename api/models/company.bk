const mongoose = require('mongoose')
const Employee = require('../models/employee')

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact_email:{
        type:String,
        validate:{
            validator: function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props=> `${props.value} is not a valid email address`
        },
        required:[true, 'Please enter a valid email address']
    },
    employees:[Employee]
    
})

module.exports = mongoose.model('Company', companySchema)
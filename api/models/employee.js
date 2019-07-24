const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    preferred_name:{
        type:String
    },
    position:{
        type:String
    },
    birthday:{
        type:String
    },
    email:{
        type:String,
        validate:{
            validator: function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props=> `${props.value} is not a valid email address`
        },
        required:[true, 'Please enter a valid email address']
    }
})

module.exports = mongoose.model('Employee', employeeSchema)
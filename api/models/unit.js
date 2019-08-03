const mongoose = require('mongoose')
const shortid = require('shortid')

const employeeSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: shortid.generate
    },
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
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

const companySchema = new mongoose.Schema({
    _id:{
        type: String,
        default: shortid.generate
    },
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
    employees:[employeeSchema]
    
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


const unitSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: shortid.generate
    },
    kind:{
        type:String,
        enum:['seat','desk','small office','large office','floor'],
        required:[true,'Please enter a valid unit kind']
    },
    floor:{
        type:Number,
        min:[0,'a floor can not be less than 0'],
        required: [true,'a floor is required']
    },
    special_monthly_offer:{
        type: Number,
        min:[0],
        validate:{
            validator: function(v){
                return /^[0-9]*$/.test(v);
            },
            message: props=> `${props.value} is not a valid number`
        },
        required:[false, 'Please enter a valid offer number that contains only numbers']
    },
    company: companySchema
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Unit', unitSchema)

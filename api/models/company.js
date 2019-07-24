const mongoose = require('mongoose')
//chose to lean on a pre-existing validator here, with all the new TLDS now I don't think the regex would be so simple...
const isEmail = require('validator/lib/isEmail')
const employeeSchema = require('./employee')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact_email: {
        type: String,
        required: true,
        validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email address`
        }
    },
    employees: [employeeSchema]
})
schema.index({name: 'text'})


module.exports = schema
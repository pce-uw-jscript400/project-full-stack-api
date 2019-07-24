const mongoose = require('mongoose')
//chose to lean on a pre-existing validator here, with all the new TLDS now I don't think the regex would be so simple...
const isEmail = require('validator/lib/isEmail')
//again, regex via date or splitting on '-' and all the edge cases here make my brain want to melt, plus I learned a bit about ISO 8601 here :)
const isDate = require('validator/lib/isISO8601')

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    preferred_name: {
        type: String
    },
    position: {
        type: String
    },
    birthday: {
        type: String,
        validate: {
            validator: isDate,
            message: props => `${props.value} is not a valid date, please use ISO 8601 format: yyyy-mm-dd`
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email address`
        }
    }
})
schema.index({first_name: 'text', last_name: 'text'})

module.exports = schema
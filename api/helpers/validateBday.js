const isDate = require('validator/lib/isISO8601')

const validateBdays = (req, res, next) => {
    const { birthday } = req.query
    if (birthday) {
        if(!isDate(birthday)) next({status: 400, message:`${birthday} is incorrectly formatted, use format yyyy-mm-dd`})
    }
    next()
}

module.exports = validateBdays
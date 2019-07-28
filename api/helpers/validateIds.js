const mongoose = require('mongoose')

const validateIds = (req, res, next) => {
    const ids = req.params
    for (let id of Object.values(ids)){
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error(`${id} is not a valid id, please try again`)
            error.status = 400
            next(error)
        }
    }
    next()
}

module.exports = validateIds
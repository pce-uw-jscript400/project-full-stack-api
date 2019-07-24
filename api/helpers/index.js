const mongoose = require('mongoose')

//not using these now but might later
const errors = {
    missingCompany : id => `Unit ${id} is currently unoccupied`,
    missingUnit : id => `No unit matching id: ${id}`,
    missingEmployee : id => `No employee found with id: ${id}`
}

const validateIds = (req, res, next) => {
    const ids = req.params
    for (let id of ids){
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error(`${id} is not a valid id, please try again`)
            error.status = 400
            next(error)
        }
    }
    next()
}

module.exports = { validateIds }
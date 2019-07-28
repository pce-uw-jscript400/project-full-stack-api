// Include :unitId
const router = require('express').Router({ mergeParams: true })
const Units = require('../models/unit')
// middleware, checks to make sure ids are valid in req.params
const validateIds = require('../helpers/validateIds')

const publicKeys = '_id kind floor special_monthly_offer company'


/** PATCH /api/v1/units/:unitId/company
 |
 | Update the company associated with the given unit and return the newly updated document.
 | This can also be used to change a unit's listing from being empty to being occupied.
 | If the ID provided does not match a unit, return a 404 and an appropriate message.
 */
router.patch('/', validateIds, async (req, res, next) => {
    const status = 200
    const { unitId } = req.params
    try {
        const unit = await Units.findById(unitId).select(publicKeys)
        //if company is null, assign it to the empty object which we'll populate
        if(!unit.company) {
            unit.company = {}
        }

        try {
            Object.assign(unit.company, req.body)
            await unit.save()
            //return the unit
            res.status(status).json({status, unit})

        } catch(e){
            //validator issue
            const err = new Error(e.message)
            err.status = 400
            next(err)
        }
    
    } catch (err) {
        err.message = `No unit matching id: ${unitId}`
        err.status = 404
        next(err)
    }

})

/** DELETE /api/v1/units/:unitId/company
 |
 | Remove the company from the given unit
 | If the ID provided does not match a unit, return a 404 and an appropriate message.
 */

//Remove the company from the given unit. If the ID provided does not match a unit, return a 404 and an appropriate message.
router.delete('/', validateIds, async (req, res, next) => {
    const status = 200
    const { unitId } = req.params
    try {
        const unit = await Units.findById(unitId)
        const company = unit.company.remove()
        await unit.save()
        
        res.status(status).json({status, company})
    } catch (err) {
        err.message = `No unit matching id: ${unitId}`
        err.status = 404
        next(err)
    }
    
})

module.exports = router
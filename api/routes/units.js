const router = require('express').Router()
const Units = require('../models/unit')
// middleware, checks to make sure ids are valid in req.params
const validateIds = require('../helpers/validateIds')

const publicKeys = '_id kind floor special_monthly_offer company'

/** GET /api/v1/units
 | optional kind, floor and occupied query params
 |
 | Return a list of all of the units with all related information.
 */
router.get('/', async (req, res, next) => {
    const status = 200
    const { occupied } = req.query
    let response
    //logic here is pretty lame, can maybe use exists? how do these combine?
    if ( occupied ) {
        response = ( occupied == 'true' )
            ? await Units.where('company').ne(null).select(publicKeys)
            : await Units.where('company').eq(null).select(publicKeys)
    } else {
        response = await Units.find(req.query).select(publicKeys)
    }

    res.json({status, response})
})

/** PATCH /api/v1/units/:id
 |
 | Update the unit with whatever information is specified in the request body and return the newly updated document.
 | If the ID provided does not match a unit, return a 404 and an appropriate message.
 */
router.patch('/:id', validateIds, async(req, res, next) => {
    const status = 200
    const { id } = req.params
    const query = {_id: id}
    try {
        const unit = await Units.findOneAndUpdate(query).select(publicKeys)
        try {
            Object.assign(unit, req.body)
            await unit.save()
            res.status(200).json({status, unit})
        } catch (e){
            //validator issue
            e.status = 404
            next(e)
        }
        
    } catch (err) {
        err.message = `No unit matching id: ${id}`
        err.status = 404
        next(err)
    }
})

module.exports = router
const router = require('express').Router()
const Units = require('../models/unit')

const publicKeys = '_id kind floor special_monthly_offer company'

//this should take into account the first four routes, including ?kind="floor", ?floor=1 and ?occupied=true
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


router.patch('/:id', async(req, res, next) => {
    const status = 200
    const { id } = req.params
    const query = {_id: id}
    try {
        const unit = await Units.findOneAndUpdate(query).select(publicKeys)
        Object.assign(unit, req.body)
        await unit.save()
        res.status(200).json({status, unit})
    } catch (err) {
        err.message = `No unit matching id: ${id}`
        err.status = 404
        next(err)
    }
})

module.exports = router
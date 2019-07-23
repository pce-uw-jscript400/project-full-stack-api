const router = require('express').Router()
const Unit = require('../models/unit')

// CREATE new unit

router.post('/', (req, res, next) => {
    const status = 201
    Unit.create(req.body).then(response => {
        res.status(201).json({ status, response })
    }).catch(error => {
        console.error(error)
        const err = new Error('Validation problem. Add a useful message')
        err.status = 400
        next(err)
    })
})

// GET /api/v1/units?kind=[kind]
// GET /api/v1/units?kind=[kind]
// GET /api/v1/units?floor=[integer]
// GET /api/v1/units?occupied=[true/false]

router.get('/', async (req, res, next) => {
    if (req.query) {
        const status = 200
        const response = await Unit.find(req.query).select('_id company kind floor special_monthly_offer')
        res.json({ status, response })
    } else {
        const status = 200
        const response = await Unit.find().select('_id company kind floor special_monthly_offer')
        res.json({ status, response })
    }
})

// PATCH /api/v1/units/[id]

// PATCH /api/v1/units/[id]/company

// DELETE /api/v1/units/[id]/company

router.delete('/:id' , async (req, res, next) => {
    const status = 200
    const response = await Unit.findOneAndDelete({ _id: req.params.id })
    res.json({ status, response })
})

module.exports = router

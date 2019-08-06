const router = require('express').Router()
const Unit = require('../models/unit')

// CREATE new unit

router.post('/', (req, res, next) => {
    const status = 201
    Unit.create(req.body).then(response => {
        res.status(201).json({
            status,
            response
        })
    }).catch(error => {
        console.error(error)
        const err = new Error('Validation problem. Add a useful message')
        err.status = 400
        next(err)
    })
})

//  [X] [GET /api/v1/units]
//  [X] [GET /api/v1/units?kind=[kind]]
//  [X] [GET /api/v1/units?floor=[integer]]
//  [X] [GET /api/v1/units?occupied=[true/false]]

router.get('/', async (req, res, next) => {
    const status = 200
    try {
        if (req.query) {
            const {
                kind,
                floor,
                occupied
            } = req.query
            if (kind || floor) {
                const response = await Unit.find(req.query).select('-created_at -updated_at -__v')
                res.json({
                    status,
                    response
                })
            } else if (occupied) {
                if (occupied === 'true') {
                    const response = await Unit.find().select('-created_at -updated_at -__v')
                    res.json({
                        status,
                        response
                    })
                } else if (occupied === 'false') {
                    const response = await Unit.find({
                        company: null
                    }).select('-created_at -updated_at -__v')
                    res.json({
                        status,
                        response
                    })
                }
            } else {
                const response = await Unit.find().select('-created_at -updated_at -__v')
                res.json({
                    status,
                    response
                })
            }
        }
    } catch (e) {
        const error = new Error('Incorrect query')
        error.status = 400
        next(error)
    }
})


// [X] [PATCH /api/v1/units/[id]

router.patch('/:id', async (req, res, next) => {
    try {
        const status = 200
        const response = await Unit.findOneAndUpdate({
                _id: req.params.id
            },
            req.body, {
                new: true
            })
        res.json({
            status,
            response
        })

    } catch (e) {
        const error = new Error('ID does not match any unit')
        error.status = 404
        next(error)
    }

})

// [X] PATCH /api/v1/units/[id]/company

router.patch('/:id/company', async (req, res, next) => {
    try {
        if (req.body.company) {
            const status = 200
            const response = await Unit.findOneAndUpdate({
                _id: req.params.id
            }, {
                company: req.body.company
            }, {
                new: true
            })
            res.json({
                status,
                response
            })
            // const unit = await Unit.findById(req.params.id)
            // Object.assign(unit, req.body)
            // console.log(req.body)
        }
    } catch (e) {
        const error = new Error('ID does not match any unit')
        error.status = 404
        next(error)
    }
})

// [X] DELETE /api/v1/units/[id]/company - Still Working on

router.delete('/:id/company', async (req, res, next) => {
    try {
        const status = 200
        const unit = await Unit.findById(req.params.id).select('-__v')
        console.log(unit)
        unit.company.remove()
        console.log(unit)
        // const response = await unit.save()
        res.json({
            status,
            response
        })
    } catch (e) {
        const error = new Error('ID does not match any unit')
        error.status = 404
        next(error)
    }
})

// [] GET /api/v1/units/[id]/company/employees

router.get('/:id/company/employees', async (req, res, next) => {

    const {
        id
    } = req.params

    console.log(id)

    // const response = await Unit.find({ _id: req.params.id })

    const response = await Unit.findById(req.params.id)

    const {
        company
    } = response

    console.log(company)

    res.json({
        // status,
        response
    })
})

// [] GET /api/v1/units/[id]/company/employees/[id]

// [] POST /api/v1/units/[id]/company/employees

// [] PATCH /api/v1/units/[id]/company/employees/[id]

// [] DELETE /api/v1/units/[id]/company/employees/[id]

module.exports = router
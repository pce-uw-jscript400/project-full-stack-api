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
//  [ ] [GET /api/v1/units?occupied=[true/false]]

// router.get('/', async (req, res, next) => {
//         const status = 200
//         if (req.query) {
//             const { kind, floor, occupied} = req.query
//             if (kind) {
//                 console.log(kind)
//             } else if (floor) {
//                 console.log(floor)
//             } else if (occupied) {
//                 console.log(occupied)
//             } else {
//                 console.log('no query')
//             }

//         } else {
//             console.log('no query')
//         }
//         const response = await Unit.find(req.query).select('-created_at -updated_at -__v')//.select('_id company kind floor special_monthly_offer')
//         res.json({ status, response })
// })

router.get('/', async (req, res, next) => {
    const status = 200
    if (req.query) {
        const response = await Unit.find(req.query).select('_id company kind floor special_monthly_offer')
        res.json({
            status,
            response
        })
    } else {
        const response = await Unit.find().select('_id company kind floor special_monthly_offer')
        res.json({
            status,
            response
        })
    }
})

//  [X] [PATCH /api/v1/units/[id]]

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

    } catch {

    }

})

// PATCH /api/v1/units/[id]/company

// DELETE /api/v1/units/[id]/company - Still Working on

router.delete('/:id/company', async (req, res, next) => {
    Unit.findOneAndDelete({
        _id: req.params.id
    }).then(response => {
        const status = `Removed compnay with ID ${req.params.id} from the database`
        res.status(201).json({
            status,
            response
        })
    }).catch(error => {
        console.error(error)
        const err = new Error('Could not find company with that ID.')
        err.status = 404
        next(err)
    })

})

module.exports = router
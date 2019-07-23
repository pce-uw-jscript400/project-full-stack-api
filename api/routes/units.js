const router = require('express').Router()
const Units = require('../models/units')

//Get all routes
router.get('/', (req, res, next) => {
    const status = 200
    Units.find().then(response => {
        res.json({ status, response })
    })
    console.log(req.query)
})

//Get unit details
router.get('/units', (req, res, next) => {
    console.log(req.query)
})

//Get unit by ID
router.get('/:id', (req, res, next) => {
    res.json('Something')
})

//Get unit by ID and company
router.get('/:id/company', (req, res, next) => {
    res.json('unit id and company')
})

router.get('/companies', (req, res, next) => {
    res.json('Companies')
})
//Create
router.post('/', (req, res, next) => {
    const status = 201
    console.log('req.body', req.body )
    Units.create(req.body).then(response => {
        res.status(201).json({ status, response })
    }).catch(error => {
        console.error(error) 
        const err = new Error('Validation problem. Add a useful message lol')
        err.status = 400
        next(err)
    })
})

module.exports = router
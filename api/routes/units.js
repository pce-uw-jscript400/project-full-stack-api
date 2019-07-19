const router = require('express').Router()
const Unit = require('../models/unit')

router.get('/units', (req, res, next) => {
    const status = 200
    Unit.find().then(response => {
        res.json({ status, response })
    })
})

router.post('/units', (req, res, next) => {
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

module.exports = router

const router = require('express').Router()
const Company = require('../models/company')

router.get('/companies', (req, res, next) => {
    const status = 200
    Company.find().then(response => {
        res.json({ status, response })
    })
})

router.post('/companies', (req, res, next) => {
    const status = 201
    Company.create(req.body).then(response => {
        res.status(201).json({ status, response })
    }).catch(error => {
        console.error(error)
        const err = new Error('Validation problem. Add a useful message')
        err.status = 400
        next(err)
    })
})

module.exports = router

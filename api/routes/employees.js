const router = require('express').Router()
const Employee = require('../models/employee')

router.get('/employees', (req, res, next) => {
    const status = 200
    Employee.find().then(response => {
        res.json({ status, response })
    })
})

router.post('/employees', (req, res, next) => {
    const status = 201
    Employee.create(req.body).then(response => {
        res.status(201).json({ status, response })
    }).catch(error => {
        console.error(error)
        const err = new Error('Validation problem. Add a useful message')
        err.status = 400
        next(err)
    })
})

module.exports = router

const router = require('express').Router()
const Employee = require('../models/employee')

// CREATE new employee record

router.post('/', (req, res, next) => {
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

// [ ] [GET /api/v1/employees?name=[partial-query]]
// [ ] [GET /api/v1/employees?birthday=[date]]

router.get('/', async (req, res, next) => {
    const { name, birthday } = req.body
    // if (req.query) {
        // not correct
        // console.log(req.query)
        // const status = 200
        // const response = await Employee.find(req.query).select('_id first_name last_name preferred_name position birthday email')
        // res.json({ status, response })
    // } else {
        const status = 200
        console.log(birthday, req.query)
        const response = await Employee.find(req.query).select('_id first_name last_name preferred_name position birthday email')
        res.json({ status, response })
    // }
})

module.exports = router

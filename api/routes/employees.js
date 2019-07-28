const router = require('express').Router()
const Employee = require('../models/employees')

router.get('/', async (req, res, next) => {
    const status = 200
    
    await Employee.find().then(response => {
        res.json({ status, response })
    })
})

module.exports = router

//not working TypeError: Employee.find is not a function
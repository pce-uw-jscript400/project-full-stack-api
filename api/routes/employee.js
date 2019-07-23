const router = require('express').Router()
const Employee = require('../models/employee')

//Get all company routes
router.get('/', async (req, res, next) => {
    const status = 200

    await Employee.find().then(response => {
        res.json({ status, response })
    })
})

module.exports = router
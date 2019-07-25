const router = require('express').Router()
const Company = require('../models/company')

// CREATE new company record

router.post('/', (req, res, next) => {
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

// [ ] [GET /api/v1/companies]
// [ ] [GET /api/v1/companies?name=[partial-query]]
// [ ] [GET /api/v1/companies?employees_lte=[integer]]
// [ ] [GET /api/v1/companies?employees_gte=[integer]]

router.get('/', async (req, res, next) => {
    if (req.query) {
        const status = 200
        const response = await Company.find(req.query).select('_id name contact_email')
        res.json({ status, response })
    } else {
        const status = 200
        const response = await Company.find().select('_id name contact_email')
        res.json({ status, response })
    }
})

module.exports = router

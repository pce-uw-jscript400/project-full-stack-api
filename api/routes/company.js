const router = require('express').Router()
const Company = require('../models/company')

//Get all company routes
router.get('/companies', async (req, res, next) => {
    const status = 200

    await Company.find().then(response => {
        res.json({ status, response })
    })
})
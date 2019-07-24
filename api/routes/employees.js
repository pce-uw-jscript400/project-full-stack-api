const router = require('express').Router()
const Units = require('../models/unit')

// ?name=partialquery & ?birthday=date $text will come in handy here
router.get('/', async(req, res, next) => {
    const status = 200
    const { name, birthday } = req.query
    let response = []
    //need a way to get just 
    const companies = await Units.find(req.query).select('company')
    for (let company of companies) {
        const filteredEmp = company.company.employees.filter(emp => emp.name.contains(name))
        response = response.concat(company.company.employees)
    }
    res.status(status).json({status, response})
})

module.exports = router 
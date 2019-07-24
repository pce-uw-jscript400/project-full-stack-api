const router = require('express').Router()
const Units = require('../models/unit')

//implement name, lte and gte -- lte and gte are keys

/**
 * GET /api/v1/companies
 * optional gte, lte and name params
 * Return all companies with all their employees information. Do not return an unit information.
 */
router.get('/', async (req, res, next) => {
    const status = 200
    const { name, lte, gte } = req.query
    
    let companies = await Units.find().select('company')
    if (name) {
        console.log(name)
        companies = companies.filter(doc => doc.company.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (gte) {
        companies = companies.filter(doc => doc.company.employees.length >= parseInt(gte))
    }
    if (lte) {
        companies = companies.filter(doc => doc.company.employees.length <= parseInt(lte))
    }
    res.status(status).json({status, companies})

})


module.exports = router
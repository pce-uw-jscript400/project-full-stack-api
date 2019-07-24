const router = require('express').Router()
const Units = require('../models/unit')

//implement name, lte and gte -- lte and gte are keys
// db.accommodations.find({'name.1': {$exists: true}})
router.get('/', async (req, res, next) => {
    const status = 200
    const { name, lte, gte } = req.query
    let response = []
    const companies = await Units.find().select('company')
    for (let company of companies) {
        console.log(company.company.employees)
        response = response.concat(company.company)
    }
    res.status(status).json({status, response})

})


module.exports = router
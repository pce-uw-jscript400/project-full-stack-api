const router = require('express').Router()
const Units = require('../models/unit')
const validateBday = require('../helpers/validateBday')

/**
 * GET /api/v1/employees
 * optional name & birthday query params
 * Return all employees based off of the partial search string. The search should be for their full name.
 * Return all employees who have a birthday on the given date. Do not return any unit or company information.
 * If no employees are found, return an empty array.
 */

router.get('/', validateBday, async(req, res, next) => {
    const status = 200
    const { name, birthday } = req.query
    let response = []
    const companies = await Units.find().select('company')
    for (let doc of companies) {
        let employees = doc.company.employees
        if (name) {
            employees = employees.filter(emp => {
                //this is a little cleaner than a chained logic statement
                let fullName = `${emp.first_name.toLowerCase()} ${emp.last_name.toLowerCase()}`
                return fullName.includes(name.toLowerCase())
            })
        }
        if (birthday) {
            employees = employees.filter(emp => emp.birthday === birthday)
        }
        response = response.concat(employees)
    }
    res.status(status).json({status, response})
})

module.exports = router 
const router = require('express').Router()
// const Company = require('../models/company')
const Unit = require('../models/unit')

// GET /api/v1/companies
// GET /api/v1/companies?name=[partial-query]
// GET /api/v1/companies?employees_lte=[integer]
// GET /api/v1/companies?employees_gte=[integer]
router.get('/', async (req, res, next) => {
  const status = 200
  try {
    const units = await Unit.find().select('company')

    let companies
    if (req.query.name) {
      companies = units.filter(unit =>
        unit.company.name.toLowerCase().includes(req.query.name.toLowerCase())
      )
    } else if (req.query.employees_lte) {
      companies = units.filter(unit =>
        unit.company.employees.length <= parseInt(req.query.employees_lte)
      )
    } else if (req.query.employees_gte) {
      companies = units.filter(unit =>
        unit.company.employees.length >= parseInt(req.query.employees_gte)
      )
    } else {
      companies = units
    }

    res.json({ status, companies })
  } catch (error) {
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})


module.exports = router

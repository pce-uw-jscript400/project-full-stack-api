const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units')
const Company = require('../models/company')

// GET /api/v1/companies
// GET ALL
router.get('/', async (req, res, next) => {
  const status = 200
  const companies = await Units.find().select('company')
  const response = await companies.find(req.query).select('_id employees name contact_email')
  console.log(companies)
  console.log(companies.find(req.query))
  // console.log(response)
  res.json({ status, response })
})

// GET /api/v1/companies?name=[partial-query]
// GET /api/v1/companies?employees_lte=[integer]
// GET /api/v1/companies?employees_gte=[integer]


module.exports = router
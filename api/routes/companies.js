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
    const response = await Unit.find({...req.query})
      .select('company')

    res.json({ status, response })
  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})





module.exports = router

const router = require('express').Router()
const Employee = require('../models/employee')
// const Unit = require('../models/unit')


// GET /api/v1/employees?name=[partial-query]
// GET /api/v1/employees?birthday=[date]

// { "authors": { "$regex": req.query, "$options": "i" } }
router.get('/', async (req, res, next) => {
  const status = 200
  try {
    const response = await Employee.find({...req.query})
      // .select('company.employees')

    res.json({ status, response })
  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})

module.exports = router

const router = require('express').Router()
const Employee = require('../models/employee')
// const Unit = require('../models/unit')


// GET /api/v1/employees?name=[partial-query]
// GET /api/v1/employees?birthday=[date]

router.get('/', async (req, res, next) => {
  const status = 200
  try {
    // this returns an empty response :(
    const response = await Employee.find({...req.query})
      // .select('company.employees')
      // .select('_id first_name last_name preferred_name position birthday email')
    // query.size
    // https://mongoosejs.com/docs/api.html#query_Query-size
    res.json({ status, response })
  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})

module.exports = router

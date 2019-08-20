const router = require('express').Router()
const Employees = require('../../models/v1/employees')

// [GET /api/v1/employees?name=[partial-query]]
// [GET /api/v1/employees?birthday=[date]]
router.get('/', async (req, res, next) => {
  try {
    const status = 200
    let query =  req.query

    const response = await Employees.find(query)
      .select('-_v')
    res.json({ status, response })
  } catch(error) {
    console.error(error)
    const e = new Error('Bad request')
    e.status = 400
    next (e)
  }
})

module.exports = router
const router = require('express').Router()
const Employees = require('../../models/employees')

// Units

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Employees.find()
  res.json({status, response})
})

module.exports = router
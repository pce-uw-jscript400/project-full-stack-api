const router = require('express').Router()
const Companies = require('../../models/companies')

// Units

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Companies.find().populate('employees')
  res.json({status, response})
})

module.exports = router

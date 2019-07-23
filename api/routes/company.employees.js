const router = require('express').Router({ mergeParams: true })
const Unit = require('../models/unit')
const Company = require('../models/company')
const Employee = require('../models/employee')


router.get('/', async (req, res, next) => {
  const status = 200
  const { employees } = await Unit.findById(req.params.unitId)
    .select('company')

  res.json({ status, employees })
})

module.exports = router

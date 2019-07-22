const router = require('express').Router()
const Units = require('../../models/units')

// Units

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Units.find().populate({
    path: 'company',
    populate: {path: 'employees'}
  })
  res.json({status, response})
})

module.exports = router
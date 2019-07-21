const router = require('express').Router()
const Units = require('../../models/units')

// Units

router.get('/', async (req, res, next) => {
  const status = 200
  if (req.query) {
    return
  }
  const response = await Units.find()
  res.json({status, response})
})

module.exports = router
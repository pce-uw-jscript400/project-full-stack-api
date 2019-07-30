const router = require('express').Router()
const Units = require('../models/units')

// GET ALL
router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Units.find(req.query).select('_id kind floor occupied special_monthly_offer company')

  res.json({ status, response })
})
  
// CREATE
router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Units.create(req.body)
    res.json({ status, response })

  } catch (error) {
    error.status = 400
    error.message = 'Invalid data. Please try again.'
    
    next(error)
  }
})

// GET BY ID
router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Units.findById(req.params.id).select('_id kind floor special_monthly_offer company')
 
  res.json({ status, response })
})

// UPDATE
router.patch('/:id', async (req, res, next) => {
  const status = 200
  const query = {_id:req.params.id}
  const options = {new:true}
  const response = await Units.findOneAndUpdate(query, req.body, options)
  
  res.json({ status, response })
})

// DELETE
router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Units.findOneAndDelete({ _id: req.params.id })

  res.json({ status, response })
})

module.exports = router
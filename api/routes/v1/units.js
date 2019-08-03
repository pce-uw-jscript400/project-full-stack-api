const router = require('express').Router()
const Units = require('../../models/units')


// Query params
const companiesQuery = (key, value) => {
  switch (key) {
    case 'kind':
      return {kind: value}
    case 'floor':
      return {floor: value}
    case 'occupied':
      if (value == 'true') {
        return {['company']:{$exists: true}}
      }
      return {['company']:{$exists: false}}
  }
}

// Units

router.get('/', async (req, res, next) => {
  const status = 200
  const query = (req.query ? companiesQuery(Object.keys(req.query)[0], req.query[Object.keys(req.query)[0]]) : '')
  const response = await Units.find(query).populate({
    path: 'company',
    populate: {path: 'employees'}
  })
  res.json({status, response})
})

router.get('/:unitId', async (req, res, next) => {
  const status = 200
  const response = await Units.findById(req.params.unitId)
  res.json({status, response})
})

router.patch('/:unitId', async (req, res, next) => {
  const status = 201
  const unitCheck = await Units.findById(req.params.unitId)
  if(!unitCheck) {
    const error = new Error('Unit not found')
    error.status = 404
    console.log(error)
    next(error)
  }
  const response = await Units.findByIdAndUpdate(req.params.unitId,{...req.body}, {new: true})

  res.json({status, response})
})

module.exports = router
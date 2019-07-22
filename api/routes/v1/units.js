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
      if (value === true) {
        return {['companies.0']:{$exists: true}}
      }
      return {['companies.0']:{$exists: false}}
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

module.exports = router
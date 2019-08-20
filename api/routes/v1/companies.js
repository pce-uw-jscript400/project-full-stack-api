const router = require('express').Router()
const Companies = require('../../models/v1/companies')

// [GET /api/v1/companies]
// [GET /api/v1/companies?name=[partial-query]]
// [GET /api/v1/companies?employees_lte=[integer]]
// [GET /api/v1/companies?employees_gte=[integer]]
router.get('/', async (req, res, next) => {
  try {
    const status = 200
    let query =  req.query
    const {employees_lte, employees_gte} = req.query
    if (employees_lte) {
      query['$lte']=employees_gte 
      delete query.employees_lte
    }
    if (employees_gte) {
      query['$gte']=employees_lte
      delete query.employees_gte
    }
    
    const response = await Companies.find(query)
      .select('_id name email employees')
    res.json({ status, response })
  } catch(error) {
    console.error(error)
    const e = new Error('Bad request')
    e.status = 400
    next (e)
  }
})

module.exports = router
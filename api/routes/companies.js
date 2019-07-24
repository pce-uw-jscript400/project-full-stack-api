const router = require('express').Router()
// const Company = require('../models/company')
const Unit = require('../models/unit')

// GET /api/v1/companies
// GET /api/v1/companies?name=[partial-query]
// GET /api/v1/companies?employees_lte=[integer]
// GET /api/v1/companies?employees_gte=[integer]
router.get('/', async (req, res, next) => {
  const status = 200
  try {
    // const response = await Unit.find({...req.query})
    //   .select('company')

    // { "authors": { "$regex": req.query, "$options": "i" } }
    // { "authors": /Alex/i }

    // .find({company: {$regex: `.*${req.query.name}.*`}})

    // searchOptions = {status:'new'}
    // searchOptions.$and = [
    //  {'name.first': {$regex:first, $options:'i'}},
    //  {'name.last': {$regex:last, $options:'i'}}
    // ]
    // Lead.find(searchOptions)

    // find({ name: new RegExp(x, 'i')}})

    // this all just returns an empty array :(
    if (req.query) {
      const match = `.*${req.query.name}.*`

      const response = await Unit
        .find({company: new RegExp(match, 'i')})
        .select('company')

      res.json({ status, response })
    } else {
      const response = await Unit.find()
        .select('company')
    }

  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})


module.exports = router

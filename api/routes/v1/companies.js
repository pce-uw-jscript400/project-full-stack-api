const router = require('express').Router()
const Companies = require('../../models/companies')

// Companies

const getQueryString = (obj) => {
  let query = '';
  if (obj) {
    let key = Object.keys(obj)[0];
    let value = obj[key];
  }
}

const companiesQuery = (key, value) => {
  switch (key) {
    case 'name':
      return {name: new RegExp(value,'i')}
    case 'employees_lte':
      let lt = `employees.${value}`;
      return {[`${lt}`]:{$exists: false}}
    case 'employees_gte':
      let gt = `employees.${value}`;
      return {[`${gt}`]:{$exists: true}}
  }
}

router.get('/', async (req, res, next) => {
  const status = 200
  const query = (req.query ? companiesQuery(Object.keys(req.query)[0], req.query[Object.keys(req.query)[0]]) : '')
  const response = await Companies.find(query).populate('employees')
  res.json({status, response})
})

module.exports = router

const router = require('express').Router()
const Employees = require('../../models/employees')

// Employees

const employeeQuery = (key, value) => {
  switch (key) {
    case 'name':
      return {
        $or:[
          {
            first_name:{
              $regex: value, 
              $options: 'i'
            }
          },
          {
            preferred_name:{
              $regex: value, 
              $options: 'i'
            }
          },
          {
            last_name:{
              $regex: value,
              $options: 'i'
            }
          }
        ]
      }
    case 'birthday':
      return {birthday: value}
  }
}

router.get('/', async (req, res, next) => {
  const status = 200
  const query = (req.query ? employeeQuery(Object.keys(req.query)[0], req.query[Object.keys(req.query)[0]]) : '')
  const response = await Employees.find(query)
  res.json({status, response})
})

module.exports = router
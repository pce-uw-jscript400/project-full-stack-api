const router = require('express').Router()
const Unit = require('../models/unit')

// This whole thing is ridiculous.

// GET /api/v1/employees?name=[partial-query]
// GET /api/v1/employees?birthday=[date]
router.get('/', async (req, res, next) => {
  const status = 200
  try {
    let units = await Unit.find().select('company.employees')
    let employees = []
    let employeeMatches = []
    for (let i = 0; i < units.length; i++) {
      for (let j = 0; j < units[i].company.employees.length; j++) {
        employees.push(units[i].company.employees[j])
      }
    }

    for (let k = 0; k < employees.length; k++){
      if (req.query.name) {
        employees = employees.filter(employee => {

          let firstName = employee.first_name.toLowerCase()
          let lastName = employee.last_name.toLowerCase()
          let name = req.query.name.toLowerCase().replace(/['"]+/g, '')

          if (firstName.includes(name) || lastName.includes(name)) {
            console.log(employee)
            employeeMatches.push(employee)
          }
        })
      } else if (req.query.birthday) {
        employees = employees.filter(employee => {
          let birthday = employee.birthday
          let providedBirthday = req.query.birthday.replace(/['"]+/g, '')

          if (birthday == providedBirthday) {
            employeeMatches.push(employee)
          }
        })
      }
    }

    res.json({ status, employeeMatches })

  } catch (error) {
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})

module.exports = router

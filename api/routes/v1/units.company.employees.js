const router = require('express').Router()
const Units = require('../../models/v1/units')


// GET /api/v1/units/[id]/company/employees]
router.get('/', async (req, res, next) => {
  const status = 200
  const { unitId } = req.params
  const unit = await Units.findById(unitId)
    .select('company')
  if (!unit) {
    const error = new Error (`Unit ${req.params.unitId} does not match any unit.`)
    error.status = 404
    next(error)
  }
  if (!unit.company) {
    const error = new Error (`No company listed for this unit.`)
    error.status = 404
    next(error)
  }
  const employees = unit.company.employees
  res.json({ status, employees })
})

// [GET /api/v1/units/[id]/company/employees/[id]]
router.get('/:id', async (req, res, next) => {
    const status = 200
    const { unitId, id } = req.params
    const unit = await Units.findById(unitId)
      .select('company')
    if (!unit) {
      const error = new Error (`Unit ${unitId} does not match any unit.`)
      error.status = 404
      next(error)
    }
    if (!unit.company) {
      const error = new Error (`No company listed for this unit ${unitId}.`)
      error.status = 404
      next(error)
    }
    if (!unit.company.employees) {
      const error = new Error (`No employees listed for this company ${unit.company.name}.`)
      error.status = 404
      next(error)
    }
    const response = unit.company.employee.id(id)
  
    res.json({ status, response })
})

// [POST /api/v1/units/[id]/company/employees]
router.post('/', async (req, res, next) => {
  const status = 201
  const { unitId } = req.params
  const unit = await Units.findById(unitId)
    .select('company')
  if (!unit) {
    const error = new Error (`Unit ${unitId} does not match any unit.`)
    error.status = 404
    next(error)
  }
  if (!unit.company) {
    const error = new Error (`No company listed for this unit ${unitId}.`)
    error.status = 404
    next(error)
  }
  const employees = unit.company.employees
  const newEmployee = req.body
  const { first_name, last_name, email } = newEmployee
  if (!first_name || !last_name || !email  ){
    const error = new Error (`Request body is malformed.
    ${(first_name)?first_name:""}, 
    ${(last_name)?last_name:""}, 
    ${(email)?email:""}, 
    is missing from request body.
    `)
    error.status = 400
    next(error)
  }

  employees.push(
    newEmployee
  )
  await unit.save()
  res.json({ status, newEmployee })
})

//  [PATCH /api/v1/units/[id]/company/employees/[id]]
router.patch('/:id', async (req, res, next) => {
  const status = 201
  const body = req.body
  const { unitId, id } = req.params
  const unit = await Units.findById(unitId)
    .select('company')
  if (!unit) {
    const error = new Error (`Unit ${unitId} does not match any unit.`)
    error.status = 404
    next(error)
  }
  if (!unit.company) {
    const error = new Error (`No company listed for this unit ${unitId}.`)
    error.status = 404
    next(error)
  }
  const employee = unit.company.employees.id(id)
  const { updatedEmployee } = req.body
  const { first_name, last_name, email } = updatedEmployee
  if (!first_name || !last_name || !email  ){
    const error = new Error (`Request body is malformed.
    ${(first_name)?first_name:""}, 
    ${(last_name)?last_name:""}, 
    ${(email)?email:""}, 
    is missing from request body.
    `)
    error.status = 400
    next(error)
  }
  Object.assign(employee, updatedEmployee)
  await response.save()
  res.json({ status, employee })
})

// [DELETE /api/v1/units/[id]/company/employees/[id]]
router.delete('/:id', async (req, res, next) => {
  const status = 200
  const { unitId, id } = req.params
  const unit = await Units.findById(unitId)
    .select('company')
  if (!unit) {
    const error = new Error (`Unit ${unitId} does not match any unit.`)
    error.status = 404
    next(error)
  }
  if (!unit.company) {
    const error = new Error (`No company listed for this unit ${unitId}.`)
    error.status = 404
    next(error)
  }
  if (!unit.company.employees[id]) {
    const error = new Error (`No employee listed with this id ${id}.`)
    error.status = 404
    next(error)
  }
  const employee = unit.company.employees.id(id)
    .remove() 
  await unit.save()

  res.json({ status, employee })
})

module.exports = router
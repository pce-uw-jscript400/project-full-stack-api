const router = require("express").Router({ mergeParams: true });
const Units = require("../models/units");
const Company = require("../models/company");
const Employee = require("../models/employee")

// GET /api/v1/units/[id]/company/employees
router.get('/', async (req, res, next) => {
  const status = 200
  const unit = await Units.findById(req.params.unitId)
  const employees = unit.company.employees
  
  res.json({ status, employees })
})

// POST /api/v1/units/[id]/company/employees
router.post('/', async (req, res, next) => {
  const status = 201
  const unit = await Units.findById(req.params.unitId)
  unit.company.employees.push(req.body)
  await unit.save()

  const employee = unit.company.employees[unit.company.employees.length -1]
  res.json({ status, employee }) 
})

// GET /api/v1/units/[id]/company/employees/[id]
router.get('/:id', async (req, res, next) => {
  const status = 200
  const unit = await Units.findById(req.params.unitId)
  const employee = unit.company.employees.id(req.params.id)

  res.status(status).json({ status, employee });
})

// PATCH /api/v1/units/[id]/company/employees/[id]
router.patch('/:id', async (req, res, next) => {
  const status = 200
  const unit = await Units.findById(req.params.unitId)
  const employee = unit.company.employees.id(req.params.id)
  
  Object.assign(employee, req.body)
  await unit.save()
  
  res.status(status).json({ status, employee });
})

// DELETE /api/v1/units/[id]/company/employees/[id]
router.delete('/:id', async (req, res, next) => {
  const status = 200
  const unit = await Units.findById(req.params.unitId)
  const employee = unit.company.employees.id(req.params.id).remove()
  await unit.save()

  res.status(status).json({ status, employee });
})

module.exports = router
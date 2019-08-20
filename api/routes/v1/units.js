const router = require('express').Router()
const Units = require('../../models/v1/units')

// GET http://localhost:5000/api/v1/units
// GET http://localhost:5000/api/v1/units?kind=desk
// GET http://localhost:5000/api/v1/units?floor=2
// GET http://localhost:5000/api/v1/units?occupied=true
router.get('/', async (req, res, next) => {
  try {
    const status = 200
    let query =  req.query
    const { occupied } = req.query
    if (occupied) {
      (occupied === 'false') 
      ? query['company']=null 
      : query['company']={ $ne :null}
      delete query.occupied
    }
    const response = await Units.find(query)
      .select('_id kind floor special_monthly_offer company')
    res.json({ status, response })
   } catch(error) {
    console.error(error)
    const e = new Error('Bad request')
    e.status = 400
    next (e)
  }
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Units.findById(req.params.id)

  res.json({ status, response })
})

// PATCH http://localhost:5000/api/v1/units/5
router.patch('/:id', async (req, res, next) => {
  const status = 201
  try{
    const response = await Units.findOneAndUpdate(
      {_id: req.params.id}, 
      {
        ...req.body
      }, 
      {new: true}
    )
    res.json({ status, response })
  } catch(error){ 
    if (error.name === 'CastError'){
      const message = `Could not find unit with ID of ${req.params.id}`
      next({ status: 404, message })
    } else {
      const message = 'Bad request'
      next({ status:400, message })
    }
  }
})




/******* Routes for unit.company  *******/
// [PATCH /api/v1/units/[id]/company]
router.patch('/:unitId/company', async (req, res, next) => {
  const status = 201
  try {
    const body = req.body
    const { unitId } = req.params
    const unit = await Units.findById(unitId)
      .select('company')

    const company = unit.company
    Object.assign(company, body)
    await unit.save()
    res.json({ status, company })

  } catch(error){ 
    if (error.name === 'CastError'){
      const message = `Could not find unit with ID of ${req.params.id}`
      next({ status: 404, message })
    } else {
      const message = 'Bad request'
      next({ status:400, message })
    }
  }
})

// [DELETE /api/v1/units/[id]/company]
router.delete('/:unitId/company', async (req, res, next) => {
  try{  const status = 200
    const unit = await Units.findById(req.params.unitId)
    const company = unit.company
      .remove() 
    await unit.save()

    res.json({ status, company })
  } catch (error) {
    if (error.name === 'CastError'){
      const message = `Could not find unit with ID of ${req.params.id}`
      next({ status: 404, message })
    } else {
      const message = 'Bad request'
      next({ status:400, message })
    }
  }
})



/******* Routes for unit.company  *******/
// GET /api/v1/units/[id]/company/employees]
router.get('/:unitId/company/employees', async (req, res, next) => {
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
router.get('/:unitId/company/employees/:id', async (req, res, next) => {
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
router.post('/:unitId/company/employees/', async (req, res, next) => {
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
router.patch('/:unitId/company/employees/:id', async (req, res, next) => {
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
router.delete('/:unitId/company/employees/:id', async (req, res, next) => {
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
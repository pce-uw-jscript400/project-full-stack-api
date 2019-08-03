const router = require('express').Router({mergeParams: true})
const Units = require('../../models/units')
const Companies = require('../../models/companies')
const Employees = require('../../models/employees')

// Units
router.patch('/', async (req, res, next) => {
  const status = 201
  const response = await Units.findByIdAndUpdate(req.params.unitId, {$set:{company:req.body.company}})
  res.json({status, response})
})

router.delete('/', async (req, res, next) => {
  const status = 201
  const response = await Units.findByIdAndUpdate(req.params.unitId, {$unset:{company:""}})
  res.json({status, response})
})

router.get('/employees', async (req, res, next) => {
  const status = 200
  const Unit = await Units.findById(req.params.unitId).populate({
    path: 'company',
    populate: {path: 'employees'}
  })
  if(Unit.company && Unit.company.employees) {
    console.log('true')
    const response = Unit.company.employees
    res.json({status, response })
    next()
  }
  res.json({status: 404, message: "Could not find any associated employees" })
})

router.post('/employees', async (req, res, next) => {
  const status = 201
  const Unit = await Units.findByIdAndUpdate(req.params.unitId).populate({
    path: 'company'
  })
  const employee = new Employees(req.body)
  if (Unit.company) {
    Unit.company.employees.push(employee['_id'])
    Unit.save((err)=> {
      if (err) return console.log(err)
    }); // Error Handling
    res.json({status, response: employee })
  }
  
})
router.get('/employees/:employeeId', async (req, res, next) => {
  const status = 200
  const query = await Units.findById(req.params.unitId).populate({
    path: 'company',
    populate: {
      path: 'employees',
      match: {_id: req.params.employeeId}
    }
  })
  const response = query.company.employees
  res.json({status, response })
})

router.delete('/employees/:employeeId', async (req, res, next) => {
  const status = 201
  const Unit = await Units.findById(req.params.unitId).populate({
    path: 'company',
    populate: {
      path: 'employees',
      match: {_id: req.params.employeeId}
    }
  })
  if(Unit.company.employees) {
    Unit.company.employees.shift()
    Unit.save()
    const response = await Employees.findByIdAndDelete(req.params.employeeId)
    res.json({status, response})
    next()
  }
  res.json({status:404, message: "The employee was not found"})
})

module.exports = router
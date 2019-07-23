const router = require('express').Router()
const Unit = require('../models/unit')


// SAMPLE
// {
// 	"kind": "seat",
// 	"floor": 14,
// 	"special_monthly_offer": 600000,
// 	"company": {
// 		"name": "Polly Powers",
// 		"contact_email": "hello@hello.com",
// 		"employees": [{
//       "first_name": "Michael",
//       "last_name": "Scott",
//       "preferred_name": "MIKE",
//       "position": "boss man",
//       "birthday": "1952-07-21",
//       "email": "hello@hello.com"
//     }]
// 	}
// }


// GET /api/v1/units
// GET /api/v1/units?kind=[kind]
// GET /api/v1/units?floor=[integer]
// GET /api/v1/units?occupied=[true/false]
router.get('/', async (req, res, next) => {
  const status = 200

  if (req.query.occupied) {
    if (req.query.occupied === 'false') {
      const response = await Unit.find({company: null } )
      res.json({ status, response })
    } else {
      const response = await Unit.find({company: {$ne: null}})
      res.json({status, response})
    }
  } else {
    const response = await Unit.find({...req.query})
    res.json({ status, response })
  }

  // const response = await Unit.find({...req.query})
  //   // .select('id title start_year season_count characters')
  //
  // res.json({ status, response })

})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    let response = await Unit.create(req.body)
    res.json({ status, response })
  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})

router.get('/:id', async (req, res, next) => {
  const status = 200

  const response = await Unit.findById(req.params.id)

  res.json({ status, response })
})

// PATCH /api/v1/units/[id]
router.patch('/:id', async (req, res, next) => {
  const status = 200

  try {
    const response = await Unit.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )

    res.json({ status, response })
  } catch (error) {
    const e = new Error(error)
    e.status = 404
    next(e)
  }

})


router.delete('/:id', async (req, res, next) => {
  const status = 200

  try {
    const response = await Unit.findOneAndDelete({ _id: req.params.id})

    res.json({ status, response })
  } catch (error) {
    const e = new Error(error)
    e.status = 404
    next(e)
  }
})


// PATCH /api/v1/units/[id]/company
router.patch('/:id/company', async (req, res, next) => {
  const status = 200

  try {
    const unit = await Unit.findById(req.params.id)

    const company = unit.company
    company.set(req.body)
    await unit.save()

    res.json({status, unit})
  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 404
    next(e)
  }
})

// DELETE /api/v1/units/[id]/company
router.delete('/:id/company', async (req, res, next) => {
  const status = 200

  try {
    // const response = await Unit.findOneAndDelete({ _id: req.params.id })
    const unit = await Unit.findById(req.params.id)
    unit.company.remove()
    unit.save()

    res.json({status, unit})
  } catch (error) {
    const e = new Error(error)
    e.status = 404
    next(e)
  }
})

// GET /api/v1/units/[id]/company/employees
router.get('/:id/company/employees', async (req, res, next) => {
  const status = 200

  try {
    const response = await Unit.findById(req.params.id)
      .select('company.employees')

    if (!response.company) {
      const e = new Error('No company listed for this unit')
      e.status = 404
      next(e)
    }

    res.json({ status, response })
  } catch (error) {
    // const response = await Unit.findById(req.params.id)
    // console.log(error.name)
    // if () {
    //     const e = new Error('Id provided does not match any units')
    //     e.status = 404
    //     next(e)
    // } else if () {
    //   const e = new Error('No company listed for this unit')
    //   e.status = 400
    //   next(e)
    // } else {
    //   const e = new Error(error)
    //   e.status = 400
    //   next(e)
    // }
    const e = new Error(error)
    e.status = 400
    next(e)
  }
})

// GET /api/v1/units/[id]/company/employees/[id]
router.get('/:id/company/employees/:employeeId', async (req, res, next) => {
  const status = 200

  const response = await Unit.findById(req.params.id)
  const employee = response.company.employees.id(req.params.employeeId)

  res.json({ status, employee })
})

// POST /api/v1/units/[id]/company/employees
router.post('/:id/company/employees', async (req, res, next) => {
  const status = 201

  try {
    const response = await Unit.findById(req.params.id)

    const employee = req.body
    response.company.employees.push(employee)
    await response.save()

    res.json({ status, employee })
  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 400
    next(e)
  }
})

// PATCH /api/v1/units/[id]/company/employees/[id]
router.patch('/:id/company/employees/:employeeId', async (req, res, next) => {
  const status = 201

  try {

    const unit = await Unit.findById(req.params.id)

    const employee = unit.company.employees.id(req.params.employeeId)
    employee.set(req.body)
    await unit.save()

    //if (employee === null){
        //status = 404
        //const response = "No employee with the ID found"
        //res.json({status, response})
   // }
    res.json({status, employee})
  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 400
    next(e)
  }
})

// DELETE /api/v1/units/[id]/company/employees/[id]
router.delete('/:id/company/employees/:employeeId', async (req, res, next) => {
  const status = 200

  try {
    const unit = await Unit.findById(req.params.id)
    const employee = unit.company.employees.id(req.params.employeeId)
    employee.remove()
    await unit.save()

    res.json({status, employee})
  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 400
    next(e)
  }
})



module.exports = router

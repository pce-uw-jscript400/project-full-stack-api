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

  try {
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
  } catch (error) {
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    let response = await Unit.create(req.body)
    res.json({ status, response })
  } catch (error) {
    const e = new Error(error)
    e.status = 400
    next(e)
  }

})

router.get('/:id', async (req, res, next) => {
  const status = 200

  try {
    const response = await Unit.findById(req.params.id)

    res.json({ status, response })
  } catch (error) {
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
  }

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
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
  }

})


router.delete('/:id', async (req, res, next) => {
  const status = 200

  try {
    const response = await Unit.findOneAndDelete({ _id: req.params.id})

    res.json({ status, response })
  } catch (error) {
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
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
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
  }
})

// DELETE /api/v1/units/[id]/company
router.delete('/:id/company', async (req, res, next) => {
  const status = 200

  try {
    // const response = await Unit.findOneAndDelete({ _id: req.params.id })
    const unit = await Unit.findById(req.params.id)

    if (!unit.company || !unit.company.employees) {
      const e = new Error('No company listed for this unit')
      e.status = 404
      next(e)
    }

    unit.company.remove()
    unit.save()

    res.json({status, unit})
  } catch (error) {
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
  }
})

// GET /api/v1/units/[id]/company/employees
router.get('/:id/company/employees', async (req, res, next) => {
  const status = 200

  try {
    const unit = await Unit.findById(req.params.id)

    if (!unit.company || !unit.company.employees) {
      const e = new Error('No company listed for this unit')
      e.status = 404
      next(e)
    }

    const employees = unit.company.employees

    res.json({ status, employees })
  } catch (error) {
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
  }
})

// GET /api/v1/units/[id]/company/employees/[id]
router.get('/:id/company/employees/:employeeId', async (req, res, next) => {
  const status = 200

  try {
    const unit = await Unit.findById(req.params.id)

    if (!unit.company || !unit.company.employees) {
      const e = new Error('No company listed for this unit')
      e.status = 404
      next(e)
    }

    const employee = unit.company.employees.id(req.params.employeeId)

    res.json({ status, employee })
  } catch (error) {
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
  }

})

// POST /api/v1/units/[id]/company/employees
router.post('/:id/company/employees', async (req, res, next) => {
  const status = 201

  try {
    const unit = await Unit.findById(req.params.id)

    if (!unit.company || !unit.company.employees) {
      const e = new Error('No company listed for this unit')
      e.status = 404
      next(e)
    }

    const employee = req.body
    unit.company.employees.push(employee)
    await unit.save()

    res.json({ status, employee })
  } catch (error) {
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
  }
})

// PATCH /api/v1/units/[id]/company/employees/[id]
router.patch('/:id/company/employees/:employeeId', async (req, res, next) => {
  const status = 201

  try {
    const unit = await Unit.findById(req.params.id)

    if (!unit.company || !unit.company.employees) {
      const e = new Error('No company listed for this unit')
      e.status = 404
      next(e)
    }

    const employee = unit.company.employees.id(req.params.employeeId)
    employee.set(req.body)
    await unit.save()

    res.json({status, employee})
  } catch (error) {
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
  }
})

// DELETE /api/v1/units/[id]/company/employees/[id]
router.delete('/:id/company/employees/:employeeId', async (req, res, next) => {
  const status = 200

  try {
    const unit = await Unit.findById(req.params.id)

    if (!unit.company || !unit.company.employees) {
      const e = new Error('No company listed for this unit')
      e.status = 404
      next(e)
    }

    const employee = unit.company.employees.id(req.params.employeeId)
    employee.remove()
    await unit.save()

    res.json({status, employee})
  } catch (error) {
    if (error.name === 'CastError') {
      const e = new Error('Id provided does not match any units')
      e.status = 404
      next(e)
    } else {
      const e = new Error(error)
      e.status = 404
      next(e)
    }
  }
})



module.exports = router

const router = require('express').Router()
const Units = require('../../models/v1/units')


// [PATCH /api/v1/units/[id]/company]
router.patch('/', async (req, res, next) => {
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
router.delete('/', async (req, res, next) => {
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
module.exports = router
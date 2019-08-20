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

module.exports = router
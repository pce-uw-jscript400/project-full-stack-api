const router = require('express').Router()
const Units = require('../../models/v1/units')

// {
// 	"kind": "small_office",
// 	"floor": 5,
// 	"special_monthly_offer": 5000000,
// 	"company": {
// 		"name": "Web Developers R Us",
// 		"contact_email": "help@webdevelopersrus.com",
// 		"employees": [{
//       "first_name": "Webster",
//       "last_name": "D'Veloper",
//       "preferred_name": "Webby",
//       "position": "Dictionary Writer",
//       "birthday": "1900-01-30",
//       "email": "wdveloper@webdevelopersrus.com"
//     }]
// 	}
// }

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

// router.put('/:id', async (req, res, next) => {
//   const status = 200
//   const response = await Books.findOneAndUpdate(
//     {_id: req.params.id,}, 
//     {
//       title: req.body.title,
//       published: req.body.published,
//       authors: req.body.authors
//     }, 
//     {new: true},
//     () => {
//       const message = `Could not find fruit with ID of ${id}`
//       next({ status: 404, message })
//     }
//   )
//   res.json({ status, response })
// })

// router.delete('/:id', async (req, res, next) => {
//   const status = 200
//   const response = await Books.findOneAndDelete({_id: req.params.id})


//   res.json({ status, response })
// })

// router.post('/', async (req, res, next) => {
//   const status = 201
//   try {
//     const response = await Books.create(
//       req.body
//     )
  
//     res.json({ status, response })
//   }catch(error ) {
//       console.error(error)
//       const e = new Error('Bad request')
//       e.status = 400
//       next (e)
//     }
// })

module.exports = router
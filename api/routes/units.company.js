const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units')
const Company = require('../models/company')

// GET ALL
router.get('/', async (req, res, next) => {
  const status = 200
  const {company} = await Units.findById(req.params.unitId).select('company')
  
  res.json({ status, company })
})

// CREATE
router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Company.create(req.body)
    res.json({ status, response })

  } catch (error) {
    error.status = 400
    error.message = 'Invalid data. Please try again.'
    
    next(error)
  }
})

// router.get('/:id', async (req, res, next) => {
//   const status = 200
//   const {authors} = await Books.findById(req.params.bookId).select('authors')
//   const author = authors.id(req.params.id)

//   res.json({ status, author })
// })

// router.put('/:id', async (req, res, next) => {
//   const status = 200
//   const books = await Books.findById(req.params.bookId)
//   const author = books.authors.id(req.params.id)
//   //here "id" is the name of the parameter, and we are identifying the id of the author through the param that we specify. Could you break this down a little? It has some layers I am not following.
//   Object.assign(author, req.body)
//   // ok, so "author" is the target, and "req.body" is the source. We are forever changing "author" by copying/adding the properties from "req.body" to "author"
//   await books.save()
  
//   res.status(status).json({ status, author });
// })

// router.delete('/:id', async (req, res, next) => {
//   const status = 200
//   const books = await Books.findById(req.params.bookId)
//   const author = books.authors.id(req.params.id).remove()
//   await books.save()

//   res.status(status).json({ status, author });
// })

module.exports = router
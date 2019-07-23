const router = require('express').Router({ mergeParams: true })
const Unit = require('../models/unit')
const Company = require('../models/company')


router.get('/', async (req, res, next) => {
  const status = 200
  const { company } = await Unit.findById(req.params.unitId).select('company')

  res.json({ status, company })
})

// router.patch('/company', async (req, res, next) => {
//   const status = 200
//   const unit = await Unit.findById(req.params.unitId)
//   console.log(unit)
//   const company = unit.company.id(req.params.id)
//   // Object.assign(company, req.body)
//   console.log(company)
//   res.json({ status, company})
// })

// router.patch('/company', async (req, res, next) => {
//   const status = 200
//
//   try {
//     const unit = await Unit.findById(req.params.id)
//     // const company = unit.company
//     console.log(req.body)
//     console.log(req.body.company)
//
//     unit.company.set(req.body)
//     await unit.save()
//
//     res.json({status, unit})
//   } catch (error) {
//     console.log(error)
//     const e = new Error(error)
//     e.status = 400
//     next(e)
//   }
// })

  // try {
  //   const book = await Books.findById(req.params.bookId)
  //
  //   book.authors.push(req.body)
  //   await book.save()
  //
  //   const author = book.authors[book.authors.length - 1]
  //   res.status(status).json({status, author})
  // } catch (error) {
  //   const e = new Error(error)
  //   e.status = 400
  //   next(e)
  // }


//
//  router.get('/:id', async (req, res, next) =>{
//     const status = 200
//     const { authors } = await Books.findById(req.params.bookId).select('authors')
//     const author = authors.id(req.params.id)
//     res.json({status, author})
// })
//
//  router.put('/:id', async (req, res, next) => {
//     const status = 200
//     const book = await Books.findById(req.params.bookId)
//
//      const author = book.authors.id(req.params.id)
//     Object.assign(author, req.body)
//     await book.save()
//
//      res.status(status).json({status, author})
// })
//
//  router.delete('/:id', async (req, res, next) => {
//     const status = 200
//     const book = await Books.findById(req.params.bookId)
//     const author = book.authors.id(req.params.id).remove()
//     await book.save()
//
//      res.status(status).json({status, author})
// })

 module.exports = router

const router = require('express').Router()
const Unit = require('../models/unit')

//GET ALL
router.get('/',(req, res, next) => {
    const status = 200
    Unit.find().then(response => {
        console.log(response)
        res.json({ status, response })
    })
})

// CREATE
router.post('/', (req, res, next) => {
    const status = 201
    // console.log('req.body', req.body)
    Unit.create(req.body).then(response => {
        throw 'everything is broken'
        // console.log(response)
        res.status(status).json({ status, response })
    }).catch(error => {
        console.error(error)
        const err = new Error('Validation problem. Add a useful message.')
        err.status = 400
        next(err)
    })
})

module.exports = router
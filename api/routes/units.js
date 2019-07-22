const router = require('express').Router()
const Units = require('../models/units')

//Get all routes

router.get('/', (req, res, next) => {
    const status = 200
    Units.find().then(response => {
        console.log(response)
        res.json({ status, response })
    })
})

//Create
router.post('/', (req, res, next) => {
    const status = 201
    console.log('req.body', req.body )
    Units.create(req.body).then(response => {
        console.log(response)
        res.status(201).json({ status, response })
    }).catch(console.error)
})

module.exports = router
const router = require('express').Router()
const Units = require('../models/units')


//Get all routes and queries. 
router.get('/units', async (req, res, next) => {
    const status = 200

     if(typeof req.query.kind != 'undefined'){
        res.json(req.query)
    } else if (typeof req.query.floor != 'undefined') {
        res.json(req.query)
    } else if (typeof req.query.occupied != 'undefined') {
        if (await Units.find().then(response => {res.json({ status, response })}) != 'null'){
            res.json('No Vancancies')
        } else {
            res.json('Vancancy')
        }
    } else {
        await Units.find().then(response => {
            res.json({ status, response })
        })
    }
})



//Get unit by ID
router.get('/units/:id?', (req, res, next) => {
    res.json('Something')
})

//Get unit by ID and company
router.get('/units/:id/companies', (req, res, next) => {
    res.json('unit id and company')
})

router.get('/companies', (req, res, next) => {
    res.json('Companies')
})
//Create
router.post('/', (req, res, next) => {
    const status = 201
    console.log('req.body', req.body )
    Units.create(req.body).then(response => {
        res.status(201).json({ status, response })
    }).catch(error => {
        console.error(error) 
        const err = new Error('Validation problem. Add a useful message lol')
        err.status = 400
        next(err)
    })
})

module.exports = router
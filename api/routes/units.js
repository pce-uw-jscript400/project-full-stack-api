const router = require('express').Router()
const Units = require('../models/units')
const Company = require('../models/company')


//Get all routes and queries. 
router.get('/units', async (req, res, next) => {
    const status = 200

     if(typeof req.query.kind !== 'undefined'){
         await Units.find().select('kind').then(response => {
            res.json({ status, response })
         })

    } else if (typeof req.query.floor !== 'undefined') {
        await Units.find().select('floor').then(response => {
            res.json({ status, response })
         })

    } else if (typeof req.query.occupied !== 'undefined') {
        await Units.find({company: []}, (err, result) => {
            if (err) {console.log(err)}
            if (!result.length) {
                 Units.find({company: []}).then(response => {
                    res.json({ status, response})
                }).catch(error => {
                    console.error(error)
                })
            } else{
                 Units.find({company: []}).then(response => {
                    res.json({status, response})
                }).catch(error => {
                    console.error(error)
                })
            }
        }).catch(error => {
            console.error(error)
        })
    } else {
        await Units.find().then(response => {
            res.json({ status, response })
        })
    }
})

//Get unit by ID
router.patch('/units/:id', async (req, res, next) => {
    const status = 201

    await Units.findById(req.params.id, (err, unit) => {
        if(err){
            console.error(err)
        } else {
            unit.save()
            res.json({ status, unit})
            
        }
    })
    
})

//Get unit by ID
router.get('/units/:id', async (req, res, next) => {
    const status = 201
    await Units.findById(req.params.id).then(response => {
        res.json({status, response})
    }).catch(error => {
        console.error(error)
    })
})

//Get unit by ID and company
router.get('/units/:id/companies', (req, res, next) => {
    res.json('unit id and company')
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
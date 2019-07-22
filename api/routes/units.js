const router = require('express').Router()
const Unit = require('../models/unit')
const Company = require('../models/company')
const Employee = require('../models/employee')

// GET /api/units
// Return a list of all of the units with all related information.
router.get('/units',(req, res, next) => {
    const status = 200
    Unit.find().then(response => {
        console.log(response)
        res.json({ status, response })
    })
})

// CREATE
router.post('/units', (req, res, next) => {
    const status = 201
    // console.log('req.body', req.body)
    Unit.create(req.body).then(response => {
        throw 'everything is broken'
        // console.log(response)
        res.status(status).json({ status, response })
    }).catch(error => {
        console.error(error)
        const err = new Error('Problem with creating new post')
        err.status = 400
        next(err)
    })
})

// GET /api/v1/units/[id]
router.get("/units/:id", async (req, res, next) => {
    const status = 200;
    const response = await Unit.findById(req.params.id);
    res.json({ status, response });
});

//DELETE
router.delete("/units/:id", async (req, res, next) => {
    const status = 200;
    const response = await Unit.findOneAndDelete({ _id: req.params.id });
    res.json({ status, response });
});


// PATCH /api/units/[id] 
router.patch("/units/:id", async (req, res, next) => {
    const status = 201;
    try{
        const response = await Unit.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json({status, response})
    }catch(error){
        const e = new Error("Unit doesn't exist")
        e.status = 404
        next(e)
    }
})

// // GET Companies 
// // GET http://localhost:5000/api/companies
// // Return all companies with all their employees information. Do not return an unit information.

router.get('/companies', (req, res, next) => {
    const status = 200
    Company.find().then(response => {
        res.json({ status, response })
    })
})

// router.get('/', async (req, res, next) => {
//     const status = 200
//     const response = await Companies.find().populate('employees')
//     res.json({status, response})
//   })

// GET /api/units?floor=[integer]
// e.g. GET http://localhost:5000/api/units?floor=2
// Return a list of all units that are on the provided floor. If none are found, return an empty array.

// router.get('/units', async (req, res, next) => {
//     const status = 200
//     // const response = await Unit.find({ floor: req.query.floor }).select('kind floor')
//     // res.json({ status, response })
//     Unit.find({...req.query}).select('-_id -companies -created_at kind floor') //Promise
//     .then((response) => {
//         const status = 200
//         res.status(status).json({ status, response })
//     })
//     .catch((error) => {
//         error.status = 500
//         error.message = `${req.method} ${req.path} failed. Internal server error.`
//         next(error)
//     })
// })





module.exports = router
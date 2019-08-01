const router = require('express').Router()
const Unit = require('../models/units')
const Company = require('../models/companies')
// const Employee = require('../models/employees')

// GET /api/units
// Return a list of all of the units with all related information.
router.get('/',(req, res, next) => {
    const status = 200
    Unit.find().then(response => {
        console.log(response)
        res.json({ status, response })
    })
})

// GET /api/units?kind=[kind]
// * e.g. `GET http://localhost:5000/api/units?kind=desk`
// Return a list of all units where the kind is equal to the provided kind. If none are found, return an empty array.

router.get('/', async (req, res, next) => {
    const status = 200;
    try {
        const response = await Unit.find().select('kind')
        res.json({ status, response })
        } 
    catch (error) {
        console.log(error);
        const e = new Error("Problem with showing kind for unit.");
        e.status = 400;
        next(e);
    }
});


// GET companies
router.get(':id/company',async (req, res, next) => {
    const status = 200
    const response = await Unit.findById(req.params.id).select('company')
    res.json({ status, response })
})
    // Company.find().then(response => {
    //     console.log(response)
    //     res.json({ status, response })
    // })
// })

// CREATE
router.post('/', (req, res, next) => {
    const status = 201
    console.log('req.body', req.body)
    Unit.create(req.body).then(response => {
        res.status(status).json({ status, response })
    }).catch(error => {
        console.error(error)
        const err = new Error('Problem with creating new post')
        err.status = 400
        next(err)
    })
})

// GET /api/units?kind=[kind]
// GET /api/units?floor=[integer]
// GET /api/v1/units?occupied=[true/false]

// PATCH /api/units/[id] 
router.patch("/:id", async (req, res, next) => {
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


// PATCH /api/units/[id]/company
// e.g. PATCH http://localhost:5000/api/v1/units/5/company

router.patch('/:id/company',async (req, res, next) => {
    const status = 201;
    try{
        const response = await Unit.findOneAndUpdate({_id: req.params.id},  {company: {...req.body}}, {new: true})
        res.json({status, response})
    }catch(error){
        const e = new Error("Unit doesn't exist")
        e.status = 404
        next(e)
    }
})

// DELETE /api/v1/units/[id]/company
// GET /api/v1/units/[id]/company/employees
// GET /api/v1/units/[id]/company/employees/[id]



// POST /api/v1/units/[id]/company/employees

// GET /api/v1/units/[id]
router.get("/:id", async (req, res, next) => {
    const status = 200;
    const response = await Unit.findById(req.params.id);
    res.json({ status, response });
});

//DELETE
router.delete("/:id", async (req, res, next) => {
    const status = 200;
    const response = await Unit.findOneAndDelete({ _id: req.params.id });
    res.json({ status, response });
});




// PATCH /api/units/[id]/company
// e.g. PATCH http://localhost:5000/api/v1/units/5/company

router.patch('/:id/companies', (req, res, next) => {
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

router.get('/', async (req, res, next) => {
    const status = 200
    // const response = await Unit.find({ floor: req.query.floor }).select('kind floor')
    // res.json({ status, response })
    Unit.find({...req.query}).select('-_id -companies -created_at kind floor')
    .then((response) => {
        const status = 200
        res.status(status).json({ status, response })
    })
    .catch((error) => {
        error.status = 500
        error.message = `${req.method} ${req.path} failed. Internal server error.`
        next(error)
    })
})





module.exports = router
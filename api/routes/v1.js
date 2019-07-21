const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Units = require('../models/unit')


//[GET /api/v1/units](#GET-apiv1units)
//Return a list of all of the units with all related information.
// GET /api/v1/units?kind=[kind]
//Return a list of all units where the kind is equal to the provided kind.
//If none are found, return an empty array.
// GET /api/v1/units?floor=[integer]
//Return a list of all units that are on the provided floor. If none are found, return an empty array.
// GET /api/v1/units?occupied=[true/false]
//If `true`, return a list of all units that have a company associated with them. If `false`, return a list of
// all units that have no company associated with them. If none are found in either case, return an empty array.

router.get('/units', async (req, res, next) => {
    const status = 200
    const findOccupied = req.query.occupied
    if(findOccupied){
        const response = await Units.find({company: { $exists: findOccupied } } )
        res.json({ status, response })
    }else{
        const response = await Units.find(req.query)
        res.json({ status, response })
    }
})

// PATCH /api/v1/units/[id]
//Update the unit with whatever information is specified in the request body and return the newly updated document.
// If the ID provided does not match a unit, return a 404 and an appropriate message.
//**Note:** You should allow for the company to be added from this route, if provided.
router.patch('/units/:id', async(req, res, next)=> {
    const status = 201
    try{
        const response = await Units.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json({status, response})
    }catch(error){
        const e = new Error("There is no unit with that id")
        e.status = 404
        next(e)
    }
})


// PATCH /api/v1/units/[id]/company
//Update the company associated with the given unit and return the newly updated document.
//This can also be used to change a unit's listing from being empty to being occupied.
//If the ID provided does not match a unit, return a 404 and an appropriate message.
router.patch('/units/:id/company', async(req, res, next)=> {
    const status = 201
    try{
        const unit = await Units.findOne({_id: req.params.id})
        const theCompany = unit.company
        theCompany.set(req.body)
        await unit.save()
        const response = unit
        res.json({status, response})
    }catch(error){
        console.error(`REALERROR:/n${error}`)
        const e = new Error("There is no unit with that id")
        e.status = 404
        next(e)
    }
})


//Add the units
router.post('/units', async(req, res, next)=> {
    const status = 201
    try{
        console.log(req.body)
        const response = await Units.create(req.body)
        res.json({status, response})
    }catch(error){
        console.error(error)
        const e = new Error("There was an Error with the new post")
        e.status = 400
        next(e)
    }
})


module.exports = router;
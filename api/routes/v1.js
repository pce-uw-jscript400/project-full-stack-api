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
        if(findOccupied === 'false'){
            const response = await Units.find({company: null } )
            res.json({ status, response })
        }else{
            const response = await Units.find({company: {$ne: null}})
            res.json({status, response})
        }
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

// DELETE /api/v1/units/[id]/company
//Remove the company from the given unit. If the ID provided does not match a unit, return a 404 and an
//appropriate message.
router.delete('/units/:id/company', async(req, res, next)=> {
    const status = 201
    try{
        const unit = await Units.findOne({_id: req.params.id})
        const theCompany = unit.company
        theCompany.remove()
        unit.save()
        const response = unit
        res.json({status, response})
    }catch(error){
        console.error(`REALERROR:/n${error}`)
        const e = new Error("There is no unit with that id")
        e.status = 404
        next(e)
    }
})

//GET http://localhost:5000/api/v1/units/5/company/employees
//Return all employees for the given company. If no company is listed, return a 404 and an appropriate message.
//If the ID provided does not match a unit, return a 404 and a different appropriate message.
router.get('/units/:id/company/employees', async(req, res, next)=> {
    const status = 201
    try{
        const unit = await Units.findOne({_id: req.params.id})
        const theCompany = unit.company
        const response = theCompany.employees
        res.json({status, response})
    }catch(error){
        console.error(`REALERROR:/${error}`)
        if(error.name === 'CastError'){
            const e = new Error("There is no unit with that number")
            e.status = 404
            next(e)
        }
        if(error.name === 'TypeError'){
            const e = new Error("There is no Company for this Unit")
            e.status = 404
            next(e)
        }
        const e = new Error("Something went wrong")
        e.status = 400
        next(e)
    }
})

//GET /api/v1/units/[id]/company/employees/[id]
//Return the specific employee for the given company. If no company is listed, return a 404 and an appropriate
//message. If the unit ID provided does not match a unit, return a 404 and a _different_ appropriate message.
//If no employee with that ID exists, return a _different_ appropriate message.
router.get('/units/:id/company/employees/:eid', async(req, res, next)=> {
    let status = 201
    try{
        const unit = await Units.findOne({_id: req.params.id})
        const theCompany = unit.company
        const theEmployee = theCompany.employees.id({_id: req.params.eid})
        if (theEmployee === null){
            status = 404
            const response = "No employee with the ID found"
            return res.json({status, response})
        }
        const response = theEmployee
        res.json({status, response})
    }catch(error){
        console.error(`REALERROR:/${error}`)
        if(error.name === 'CastError'){
            const e = new Error("There is no unit with that number")
            e.status = 404
            next(e)
        }
        if(error.name === 'TypeError'){
            const e = new Error("There is no Company for this Unit")
            e.status = 404
            next(e)
        }
        const e = new Error("Something went wrong")
        e.status = 400
        next(e)
    }
})


//POST /api/v1/units/[id]/company/employees
//Create a new employee and return that employee for the given company. If no company is listed,
//return a 404 and an appropriate message. If the unit ID provided does not match a unit,
// return a 404 and a _different_ appropriate message. If the employee information is malformed in any way,
//return a 400 and an error message with as much detail as possible.
router.post('/units/:id/company/employees/', async (req, res, next)=> {
   let status = 201
    try{
        const unit = await Units.findOne({_id: req.params.id})
        const theCompany = unit.company
        const newEmployee = theCompany.employees.push(req.body)
        const response = req.body
        newEmployee.isNew;
        await unit.save()
        res.json({status, response})
    }catch(error){
        console.error(`REALERROR:/${error}`)
        if(error.name === 'CastError'){
            const e = new Error("There is no unit with that number")
            e.status = 404
            next(e)
        }
        if(error.name === 'TypeError'){
            const e = new Error("There is no comapany for this unit")
            e.status = 404
            next(e)
        }
        if(error.name === 'ValidationError'){
            const e = new Error(error.message)
            e.status = 400
            next(e)
        }
        const e = new Error(error.message)
        e.status = 400
        next(e)
    }
})

// PATCH /api/v1/units/[id]/company/employees/[id]
//Update an employee and return that employee for the given company. If no company is listed, return a 404
//and an appropriate message. If the unit ID provided does not match a unit,
//return a 404 and a _different_ appropriate message. If the employee information is malformed in any way,
// return a 400 and an error message with as much detail as possible. If no employee with that ID exists,
// return a _different_ appropriate message.
router.patch('/units/:id/company/employees/:eid', async (req, res, next)=> {
    const status = 201
    try{
        const unit = await Units.findOne({_id: req.params.id})
        const theCompany = unit.company
        const employee = theCompany.employees.id({_id: req.params.eid})
        employee.set(req.body)
        await unit.save()
        const response = employee
        res.json({status, response})
    }catch(error){
        console.error(`REALERROR:/${error}`)
        if(error.name === 'CastError'){
            const e = new Error("There is no unit with that number")
            e.status = 404
            next(e)
        }
        if(error.name === 'TypeError'){
            const e = new Error("There is no employee with that number")
            e.status = 404
            next(e)
        }
        if(error.name === 'ValidationError'){
            const e = new Error(error.message)
            e.status = 400
            next(e)
        }
        const e = new Error("Something went wrong")
        e.status = 400
        next(e)
    }
})

/
/// DELETE /api/v1/units/[id]/company/employees/[id]
//Destroy the employee document and return that employee's document for the given company.
//If no company is listed, return a 404 and an appropriate message.
//If the unit ID provided does not match a unit, return a 404 and a _different_ appropriate message.
//If no employee with that ID exists, return a _different_ appropriate message.
router.delete('/units/:id/company/employees/:eid', async (req, res, next)=> {
    const status = 201
    try{
        const unit = await Units.findOne({_id: req.params.id})
        const theCompany = unit.company
        const employee = theCompany.employees.id({_id: req.params.eid})
        response = employee
        employee.remove()
        unit.save()
        res.json({status, response})
    }catch(error){
        console.error(`REALERROR:/${error}`)
        if(error.name === 'CastError'){
            const e = new Error("There is no unit with that number")
            e.status = 404
            next(e)
        }
        if(error.name === 'TypeError'){
            const e = new Error("Cannot Find Employee with that number")
            e.status = 404
            next(e)
        }
        const e = new Error("Something went wrong")
        e.status = 400
        next(e)
    }
})

//GET /api/v1/companies
//Return all companies with all their employees information. Do not return an unit information.
//GET /api/v1/companies?name=[partial-query]
//Return all companies with all their employees information based off of the partial search string.
//For example, the above search would return companies with the name of "Google" and "Ooga".
// Do not return any unit information. If no companies are found, return an empty array.

//GET /api/v1/companies?employees_lte=[integer]
// e.g. `GET http://localhost:5000/api/v1/companies?employees_lte=50`
//Return all companies with all their employees where the number of employees is less than or equal to
//the given integer. Do not return any unit information. If no companies are found, return an empty array.

// GET /api/v1/companies?employees_gte=[integer]
// `GET http://localhost:5000/api/v1/companies?employees_gte=100`
//Return all companies with all their employees where the number of employees is greater than or equal to
//the given integer. Do not return any unit information. If no companies are found, return an empty array.

router.get('/companies', async(req, res, next)=> {
    const status = 201
    try{
        const employees_lte = req.query.employees_lte

        if (employees_lte){
            const unit = await Units.find()
            //const company = unit.company
            const reponse = unit
            res.json({status, response});
        }else{
            const companyName = req.query.name
            const response = await Units.find({'company.name':{$regex: new RegExp(companyName), '$options': 'i'}})
            .select('-_id company');
            res.json({status, response});
        }

    }catch(error){
        console.log(`REALERR:${error}`)
        const e = new Error("Something went wrong")
        e.status = 400
        next(e)
    }
});


// GET /api/v1/employees?name=[partial-query]
// e.g. `GET http://localhost:5000/api/v1/employees?name=ada`
//Return all employees based off of the partial search string. The search should be for their full name.
//For example, the above search would return the following employees:
// - Adaline Smith
//- Surya Adana
//- Augusta "Ada" King-Noel
//Do not return any unit or company information. If no employees are found, return an empty array.

// GET /api/v1/employees?birthday=[date]
// GET http://localhost:5000/api/v1/employees?birthday=[date]`
// Return all employees who have a birthday on the given date. Do not return any unit or company information. I
// If no employees are found, return an empty array.



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
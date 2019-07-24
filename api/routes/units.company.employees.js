// Include :unitId
const router = require('express').Router({ mergeParams: true })
const Units = require('../models/unit')

//Return all employees for the given company.
//If no company is listed, return a 404 and an appropriate message.
//If the ID provided does not match a unit, return a 404 and a different appropriate message.
router.get('/', async (req, res, next) =>{
    const status = 200
    const { unitId } = req.params
    let unit
    try {
        unit = await Units.findById(unitId)
    } catch (err) {
        err.message = `No unit matching id: ${unitId}`
        err.status = 404
        next(err)
    }
    if (unit.company) {
        const employees = unit.company.employees
        
        res.status(200).json({status, employees})
    } else {
        next({status: 404, message: `Unit ${unitId} is currently unoccupied`})
        // const err = new Error(`Unit ${unitId} is currently unoccupied`)
        // err.status = 404
        // next(err)
    }

})

//Return the specific employee for the given company.
//If no company is listed, return a 404 and an appropriate message.
//If the unit ID provided does not match a unit, return a 404 and a different appropriate message.
//If no employee with that ID exists, return a different appropriate message.
router.get('/:id', async (req, res, next) => {
    const status = 200
    const { id, unitId } = req.params
    const unit = await Units.findById(unitId)
    if (unit.company) {
        const employee = unit.company.employees.id(id)
        if(employee) {
            res.status(status).json({status, employee})
        } else {
            const err = new Error(`No employee found with id: ${id}`)
            err.status = 404
            next(err)
        }  
    } else {
        const message = unit ? `Unit ${unitId} is currently unoccupied` : `No unit matching id: ${unitId}`
        const err = new Error(message)
        err.status = 404
        next(err)
    }
})

//Create a new employee and return that employee for the given company.
//If no company is listed, return a 404 and an appropriate message.
//If the unit ID provided does not match a unit, return a 404 and a different appropriate message.
//If the employee information is malformed in any way, return a 400 and an error message with as much detail as possible.
router.post('/', async (req, res, next) =>{
    const status = 201
    const { unitId } = req.params
    const unit = await Units.findById(unitId)
    if (unit.company) {
        try {
            unit.company.employees.push(req.body)
            await unit.save()
            const employee = unit.company.employees[unit.company.employees.length - 1]
            res.status(status).json({status, employee})
        } catch (e) {
            err = new Error(e.message)
            err.status = 400
            next(err)
        }
    } else {
        const message = unit ? `Unit ${unitId} is currently unoccupied` : `No unit matching id: ${unitId}`
        const err = new Error(message)
        err.status = 404
        next(err)
    }
})

//Update an employee and return that employee for the given company.
//If no company is listed, return a 404 and an appropriate message.
//If the unit ID provided does not match a unit, return a 404 and a different appropriate message.
//If the employee information is malformed in any way, return a 400 and an error message with as much detail as possible.
//If no employee with that ID exists, return a different appropriate message.

router.patch('/:id', async (req, res, next) =>{
    const status = 200
    const { id, unitId } = req.params
    const unit = await Units.findById(unitId)
    if(unit.company) {
        const employee = unit.company.employees.id(id)
        if (employee) {
            try {
                Object.assign(employee, req.body)
                await unit.save()
                res.status(status).json({status, employee})
            } catch (e) {
                err = new Error(e.message)
                err.status = 400
                next(err)
            }
        } else {
            const err = new Error(`No employee found with id: ${id}`)
            err.status = 404
            next(err)
        }
    } else {
        const message = unit ? `Unit ${unitId} is currently unoccupied` : `No unit matching id: ${unitId}`
        const err = new Error(message)
        err.status = 404
        next(err)
    }
})

//Destroy the employee document and return that employee's document for the given company.
//If no company is listed, return a 404 and an appropriate message.
//If the unit ID provided does not match a unit, return a 404 and a different appropriate message.
//If no employee with that ID exists, return a different appropriate message.
router.delete('/:id', async (req, res, next) => {
    const status = 200
    const { id, unitId } = req.params
    const unit = await Units.findById(unitId)
    if(unit.company) {
        const employee = unit.company.employees.id(id)
        if (employee) {
            employee.remove()
            await unit.save()
            res.status(status).json({status, employee})
        } else {
            const err = new Error(`No employee found with id: ${id}`)
            err.status = 404
            next(err)
        }
        
    } else {
        const message = unit ? `Unit ${unitId} is currently unoccupied` : `No unit matching id: ${unitId}`
        const err = new Error(message)
        err.status = 404
        next(err)
    }

})

module.exports = router
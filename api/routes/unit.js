const router = require('express').Router({ mergeParams: true })
const Unit = require('../models/unit')
const { generate: generateId } = require('shortid')

router.get('/', async(req,res,next)=>{
    const status = 200
    if(req.query.kind){
        console.log(req.query.kind)
        const response = await Unit.find({kind: req.query.kind}).select('-__v')
        res.json({status, response})
    }else if(req.query.floor){
        const response = await Unit.find({floor: req.query.floor}).select('-__v')
        res.json({status, response})
    }else if(req.query.occupied){
        if(req.query.occupied === "true"){
            const response = await Unit.find({company:{"$ne":null}}).select('-__v')
            res.json({status, response})
        }else if(req.query.occupied === "false"){
            const response = await Unit.find({company:null}).select('-__v')
            res.json({status, response})
        }else{
            const message = `Invalid occupied value: ${req.query.occupied}`
            const e = new Error(message)
            e.status = 400
            next(e)
        }
    }else{
        const response = await Unit.find().select('-__v')
        res.json({status, response})
    }
})

router.get('/:id', async(req,res,next)=>{
    const status = 200
    try{
        const response = await Unit.findById(req.params.id).select('-__v')
        res.json({status, response})
    }catch(error){
        console.log(error.message)
        const message = `Invalid unit id: ${req.params.id}`
        const e = new Error(message)
        e.status = 400
        next(e)
    }
})

router.post('/', async (req,res, next)=>{
    const status = 201
    try{
        const unit = await Unit.create(req.body)
        res.json({status, unit})
    }catch(error){
        console.log(error.message)
        const e = new Error(error.message)
        e.status = 400
        next(e)
    }
})

router.patch('/:id', async (req, res, next)=>{
    const status = 200
    try{
        const unit = await Unit.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.json({status,unit})
    }catch(error){
        console.log(error.message)
        const e = new Error('Bad request for updating unit')
        e.status = 400
        next(e)
    }
})

router.patch('/:id/company', async (req, res, next)=>{
    const status = 200
    try{
        const unit = await Unit.findByIdAndUpdate({_id:req.params.id},{company: req.body},{new:true})
        res.json({status,unit})
    }catch(error){
        console.log(error.message)
        const e = new Error('Bad request for updating company')
        e.status = 400
        next(e)
    }
})

router.delete('/:id/company', async (req, res, next)=>{
    const status = 200
    try{
        const unit = await Unit.findById(req.params.id)
        const company = unit.company.remove()
        await unit.save()
        res.json({status, company})
    }catch(error){
        console.log(error.message)
        const e = new Error(`No company exists for unit ${req.params.id}`)
        e.status = 400
        next(e)
    }
})

router.get('/:id/company/employees', async (req, res, next)=>{
    const status = 200
    try{
        const unit = await Unit.findById(req.params.id)
        const employees = unit.company.employees
        res.json({status, employees})
    }catch(error){
        console.log(error.message)
        const e = new Error(`No company exists for unit ${req.params.id}`)
        e.status = 400
        next(e)
    }
})

router.get('/:id/company/employees/:empId', async (req, res, next)=>{
    const status = 200
    try{
        const unit = await Unit.findById(req.params.id)
        const employee = unit.company.employees.id(req.params.empId)
        res.json({status, employee})
    }catch(error){
        console.log(error.message)
        const e = new Error(`No company exists for unit ${req.params.id}`)
        e.status = 400
        next(e)
    }
})

router.post('/:id/company/employees', async (req, res, next)=>{
    const status = 201
    try{
        const unit = await Unit.findById(req.params.id)
        unit.company.employees.push(req.body)
        await unit.save()
        const employee = unit.company.employees[unit.company.employees.length - 1]
        res.status(status).json({status, employee})
    }catch(error){
        console.log(error.message)
        const e = new Error(`No company exists for unit ${req.params.id}`)
        e.status = 400
        next(e)
    }
})

//needs work***
router.patch('/:id/company/employees/:empId', async (req, res, next)=>{
    const status = 200
    try{
        const unit = await Unit.findById(req.params.id)
        const employee = unit.company.employees.id(req.params.empId)
        
        res.json({status, employee})
    }catch(error){
        console.log(error.message)
        const e = new Error(`No company exists for unit ${req.params.id}`)
        e.status = 400
        next(e)
    }
})

router.delete('/:id/company/employees/:empId', async (req, res, next)=>{
    const status = 200
    try{
        const unit = await Unit.findById(req.params.id)
        const employee = unit.company.employees.id(req.params.empId).remove()
        unit.save()
        res.json({status, employee})
    }catch(error){
        console.log(error.message)
        const e = new Error(`No company exists for unit ${req.params.id}`)
        e.status = 400
        next(e)
    }
})

module.exports = router
const router = require('express').Router({ mergeParams: true })
const Unit = require('../models/unit')
const { generate: generateId } = require('shortid')


router.get('/', async(req,res,next)=>{
    const status = 200
    if(req.query.name){
        console.log(req.query.name)
        const response = await Unit.find({'company.name': req.query.name}).select('company')
        res.json({status, response})
    }else if(req.query.employees_lte){
        const response = await Unit.find({'company.employees.0':{$exists:true}})
        //.$where('company.employees.length < 10')
        .select('company')
        res.json({status, response})
    }else if(req.query.employees_gte){
        const number = req.query.employees_gte
        const response = await Unit.find({'company.employees':{$exists:true}, $where:'this.company.employees.length > 0'}).select('company')
        res.json({status, response})
    }else{
        const response = await Unit.find().select('company')
        res.json({status, response})
    }
})


module.exports = router
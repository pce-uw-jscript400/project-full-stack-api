const router = require('express').Router({ mergeParams: true })
const Unit = require('../models/unit')
const { generate: generateId } = require('shortid')

router.get('/', async(req,res,next)=>{
    const status = 200
    if(req.query.name){
        console.log(req.query.name)
        //const response = await Unit.find({'company.name': req.query.name}).select('employee')
        //res.json({status, response})
    }else if(req.query.birthday){
        const response = await Unit.find()
        //.where(company.employees.length).lt(req.query.employees_lte)
        //.select('company')
        //res.json({status, response})
    }
})


module.exports = router
const router = require('express').Router()
const Course = require('../models/course')

//GET ALL
router.get('/',(req, res, next) => {
    const status = 200
    Course.find().then(response => {
        console.log(response)
        res.json({ status, response })
    })
})

module.exports = router
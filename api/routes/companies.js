// const router = require('express').Router()
// const Company = require('../models/companies')

// // GET Companies 
// // GET http://localhost:5000/api/companies
// // Return all companies with all their employees information. Do not return an unit information.

const router = require('express').Router();
const Unit = require('../models/units');

router.get('/', async (req, res, next) => {
    const status = 200;
    const query = req.query.name;
    try {
        const companies = await Unit.find(query);
        res.json({ status, companies });
    } catch (error) {
        console.log(error);
        const e = new Error("Problem with showing all the companies.");
        e.status = 400;
        next(e);
    }
});

module.exports = router;

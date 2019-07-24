const router = require('express').Router({ mergeParams: true });
const Units = require('../models/unit.js');

/**
 * For the statements below i tried to re-factor/consolidate my code into a series of if/else if statements that would check for a query param being present, and find documents with the param key/value present. 
 * If no params in request, return all documents.
 * 
 * However, I think this would still require further re-factoring if there is a feasible scenario where more than one of these params could be submitted i.e. to filter specific results like floor=4 AND occupied = false
 * 
 * GET /api/v1/units
 *     Return a list of all of the units with all related information.
 * GET /api/v1/units?kind=[kind]
 *      Return a list of all units where the kind is equal to the provided kind. If none are found, return an empty array.
 * GET /api/v1/units?floor=[integer]
 *     Return a list of all units that are on the provided floor. If none are found, return an empty array.
 * GET /api/v1/units?occupied=[true/false]
 *       If true, return a list of all units that have a company associated with them. 
 *      If false, return a list of all units that have no company associated with them. 
 *       If none are found in either case, return an empty array.
 */

router.get('/', async (req, res, next) => {
    const status = 200;
    const {floor, kind, occupied} = req.query; // declare floor, occupied, kind params from req.query
    if (floor) { // if query param is floor
        const response = await Units.find({"unit.floor": floor}); // find units where unit.floor == floor
        res.json({ status, response });
    } else if (kind) { // otherwise, if query param is kind
        const response = await Units.find({"unit.kind": kind}); // find units where unit.kind == kind; 
        /**
         * Question - I am having trouble with this and other excercises where the param has a space  e.g. "small office". 
         * I tried using %20, + in the query param as well as just a true space, but no matter what i could not get a match.
         * What might i be doing wrong here?
        */
        res.json({ status, response });
    } else if (occupied) { // otherwise, if query param is occupied
        if (occupied === 'false') { // if query param occupied === false
            const response = await Units.find({"unit.company": {employee:[]}}); // return records where unit.company  contains an empty employee array, signifying no company / not occupied by at least one employee
            res.json({ status, response });
          } else if (occupied === 'true') { // otherwise
            const response = await Units.find({"unit.company": {$ne: {employee:[]}}}); // return records where unit.company does not contain an empty employee array, signifying a company defined / occupied by at least one employee
            res.json({status, response});
          } else {
            const response = [];
            res.json({status, response});
          }
    } else { // otherwise, if no query params
        const response = await Units.find(); // get all documents
        res.json({ status, response });
    }
});

router.get('/:id', async (req,res, next) => {
    const status = 200;
    const response = await Units.findById(req.params.id);
    res.json({status, response});
});



// POST /api/v1/units - Added to create test data

router.post('/', async (req, res, next) => {
    const status = 201;
    const response = await Units.create(req.body);
    res.json({ status, response });
});

/**
 * PATCH /api/v1/units/[id]
 *      Update the unit with whatever information is specified in the request body and return the newly updated document. 
 *      If the ID provided does not match a unit, return a 404 and an appropriate message.
 *      
 *      Note: You should allow for the company to be added from this route, if provided.  
*/

router.patch('/:id', async (req, res, next) => {
    const status = 201;
    const response = await Units.findbyIdAndUpdate({
        _id: req.params.id
    }, {
        ...req.body
    }, {
        new: true
    });
    res.json({ status, response });    
});

/**
 * PATCH /api/v1/units/[id]/company
 *    e.g. PATCH http://localhost:5000/api/v1/units/5/company
 *    Update the company associated with the given unit and return the newly updated document. This can also be used to change a unit's listing from being empty to being occupied. 
 *    If the ID provided does not match a unit, return a 404 and an appropriate message.
*/

router.patch('/:id/company', async (req, res, next) => {
    const status = 201;
    const response = await Units.findbyIdAndUpdate({
        _id:req.params.id
    },{
        company: req.body
    },{
        new:true
    });
    res.json({status,response});
});

/**
 * DELETE /api/v1/units/[id]/company
 *      e.g. DELETE http://localhost:5000/api/v1/units/5/company
 *      Remove the company from the given unit. If the ID provided does not match a unit, return a 404 and an appropriate message.
 */

 router.delete('/:id/company', async (req, res, next) => {
    const status = 201;
    const unit = await Units.findById(req.params.id);
    const updatedCompany = {company: {employee: []}};
    Object.assign(unit.unit, updatedCompany);
    await unit.save();
    res.json({status, unit});
});

/*
GET /api/v1/units/[id]/company/employees
e.g. GET http://localhost:5000/api/v1/units/5/company/employees
Return all employees for the given company. If no company is listed, return a 404 and an appropriate message. 
If the ID provided does not match a unit, return a 404 and a different appropriate message.
*/

router.get('/:id/company/employees', async (req, res, next) => {
    const status = 200;
    const unit = await Units.findById(req.params.id);
    const employees = unit.unit.company.employee;
    res.json({status, employees});
});

/*
GET /api/v1/units/[id]/company/employees/[id]
e.g. GET http://localhost:5000/api/v1/units/5/company/employees/12
Return the specific employee for the given company. If no company is listed, return a 404 and an appropriate message. 
If the unit ID provided does not match a unit, return a 404 and a different appropriate message. 
If no employee with that ID exists, return a different appropriate message.
*/

router.get('/:id/company/employees/:empId', async (req, res, next) => {
    const status = 200;
    const unit = await Units.findById(req.params.id);
    const employee = unit.unit.company.employee.id(req.params.empId);
    res.json({status, employee});
});

/*
POST /api/v1/units/[id]/company/employees
e.g. POST http://localhost:5000/api/v1/units/5/company/employees
Create a new employee and return that employee for the given company. If no company is listed, return a 404 and an appropriate message. 
If the unit ID provided does not match a unit, return a 404 and a different appropriate message. 
If the employee information is malformed in any way, return a 400 and an error message with as much detail as possible.
*/

router.post('/:id/company/employees/', async (req, res, next) => {
    const status = 201;
    const unit = await Units.findById(req.params.id);
    const employees = unit.unit.company.employee;
    employees.push(req.body);
    await unit.save();
    res.json({status, employees});
});

/*

TO DO:

-Complete Try and Catch statements for each request
-Add enum to restrict incoming values for unit.kind
-Set required: true for required values in schema
-refactor routes to appropriate .js files
-add regex for email validation

Complete routes for the following:

PATCH /api/v1/units/[id]/company/employees/[id]
e.g. PATCH http://localhost:5000/api/v1/units/5/company/employees/12
Update an employee and return that employee for the given company. If no company is listed, return a 404 and an appropriate message. 
If the unit ID provided does not match a unit, return a 404 and a different appropriate message. 
If the employee information is malformed in any way, return a 400 and an error message with as much detail as possible. 
If no employee with that ID exists, return a different appropriate message.

DELETE /api/v1/units/[id]/company/employees/[id]
e.g. DELETE http://localhost:5000/api/v1/units/5/company/employees/12
Destroy the employee document and return that employee's document for the given company. 
If no company is listed, return a 404 and an appropriate message. 
If the unit ID provided does not match a unit, return a 404 and a different appropriate message. 
If no employee with that ID exists, return a different appropriate message.

GET /api/v1/companies
e.g. GET http://localhost:5000/api/v1/companies
Return all companies with all their employees information.
Do not return an unit information.

GET /api/v1/companies?name=[partial-query]
e.g. GET http://localhost:5000/api/v1/companies?name=oog
Return all companies with all their employees information based off of the partial search string. 
For example, the above search would return companies with the name of "Google" and "Ooga". 
Do not return any unit information. 
If no companies are found, return an empty array.

GET /api/v1/companies?employees_lte=[integer]
e.g. GET http://localhost:5000/api/v1/companies?employees_lte=50
Return all companies with all their employees where the number of employees is less than or equal to the given integer. 
Do not return any unit information. 
If no companies are found, return an empty array.

GET /api/v1/companies?employees_gte=[integer]
e.g. GET http://localhost:5000/api/v1/companies?employees_gte=100
Return all companies with all their employees where the number of employees is greater than or equal to the given integer. 
Do not return any unit information. 
If no companies are found, return an empty array.

GET /api/v1/employees?name=[partial-query]
e.g. GET http://localhost:5000/api/v1/employees?name=ada
Return all employees based off of the partial search string. 
The search should be for their full name. For example, the above search would return the following employees:

Adaline Smith
Surya Adana
Augusta "Ada" King-Noel
Do not return any unit or company information. 
If no employees are found, return an empty array.

GET /api/v1/employees?birthday=[date]
e.g. GET http://localhost:5000/api/v1/employees?birthday=[date]
Return all employees who have a birthday on the given date. 
Do not return any unit or company information. 
If no employees are found, return an empty array.
*/

module.exports = router;


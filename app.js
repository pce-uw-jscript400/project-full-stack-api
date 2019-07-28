const { MONGO_DB, PORT, NODE_ENV } = process.env
const express = require('express')
const mongoose = require('mongoose')
const app = express()

if (MONGO_DB) {
    mongoose.connect(MONGO_DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    console.log('Connected to the database...')
} else {
    console.log('Could not connect to the database!')
}

if(NODE_ENV === "development") app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

//routes
app.use('/api/v1/units', require('./api/routes/units'))
app.use('/api/v1/units/:unitId/company', require('./api/routes/units.company'))
app.use('/api/v1/units/:unitId/company/employees', require('./api/routes/units.company.employees'))
app.use('/api/v1/companies', require('./api/routes/companies'))
app.use('/api/v1/employees', require('./api/routes/employees'))

app.use((req, res, next) => {
    const error = new Error(`Could not ${req.method} ${req.path}`)
    error.status = 404
    next(error)
})

app.use((err, req, res, next) =>{
    if(NODE_ENV === "development") console.error(err)
    const { message, status } = err
    res.status(status).json({ status, message })
})

const listener = () => {console.log(`Listening on port ${PORT}`)}
app.listen(PORT, listener)
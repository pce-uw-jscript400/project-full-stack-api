const { MONGO_DB, NODE_ENV, PORT } = process.env
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

//Database
if (MONGO_DB) {
    const options = { useFindAndModify: false, useNewUrlParser: true }
    mongoose.connect(MONGO_DB, options )
    console.log('Connected to database!')
} else {
    console.log('MONGO_DB is not provided')
}
//Middleware
if (NODE_ENV === 'development') app.use(morgan('dev'))
app.use(require('body-parser').json())

//Routes
app.use('/api/units', require('./api/routes/units'));
app.use('/api/employees', require('./api/routes/employees'));
app.use('/api/companies', require('./api/routes/companies'));

app.use(({ status = 500, message = 'Something went wrong' }, req, res, next) => {
    res.status(status).json({ status, message })
})

const listener = () =>(console.log('begin'))
app.listen(PORT, listener)
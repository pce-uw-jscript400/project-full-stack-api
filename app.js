// Exercise: Full Stack Coworking
const { MONGO_DB_CONNECTION, NODE_ENV, PORT } = process.env
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Database Connection
if (MONGO_DB_CONNECTION) {
  mongoose.connect(MONGO_DB_CONNECTION, { 
    useFindAndModify: false, 
    useNewUrlParser: true 
  })
  console.log('Connected to database...')
} else {
  console.log('Could not connect to database!')
}


// Application-level Middleware
if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

// Routes
app.use('/api/v1/units', require('./api/routes/v1/units'))
// app.use('/api/v1/units/:unitId/company', require('./api/routes/v1/units.company'))
// app.use('/api/v1/units/:unitId/company/employees', require('./api/routes/v1/units.company.employees'))
app.use('/api/v1/companies', require('./api/routes/v1/companies'))
app.use('/api/v1/employees', require('./api/routes/v1/employees'))


// Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Could not ${req.method} ${req.path}`)
  error.status = 404
  next(error)
})

// Error Handler
app.use((err, req, res, next) => {
  if (NODE_ENV === 'development') console.error(err)
  const { message, status } = err
  res.status(status).json({ status, message })
})

// Open Connection
const listener = () => console.log(`Listening on Port ${PORT}!`)
app.listen(PORT, listener)

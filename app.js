const { MONGO_DB, NODE_ENV, PORT } = process.env
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

// Database Connection
if (MONGO_DB) {
    const options = { useFindAndModify: false, useNewUrlParser: true }
    mongoose.connect(MONGO_DB, options)
    console.log('Connected to database!')
} else {
    console.log('MONGO_DB is not provided')
}

// Application-level Middleware
if (NODE_ENV === 'development') app.use(morgan('dev'))
app.use(require('body-parser').json())

// Routes
app.use('/api/v1/units', require('./api/routes/units'))
app.use('/api/v1/units/:unitId/company', require('./api/routes/units.company'))
// app.use('/api/v1/companies', require('./api/routes/companies'))
// app.use('/api/v1/employees', require('./api/routes/employees'))

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
const listener = () => console.log(`Running on PORT:${PORT}`)
app.listen(PORT, listener)
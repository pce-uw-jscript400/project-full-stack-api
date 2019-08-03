const {MONGO_DB_CONNECTION, NODE_ENV, PORT, } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const app = express();

if (MONGO_DB_CONNECTION) {
  mongoose.connect(MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useFindAndModify: false  
  });
  console.log('Database Connection Established')
} else {
  console.log('WARNING: Database Connection Failed!')
}

if (NODE_ENV === 'development') {
  app.use(require('morgan')('dev'))
}
app.use(require('body-parser').json())

// Routes
app.use('/api/v1/units', require('./api/routes/v1/units'))
app.use('/api/v1/companies', require('./api/routes/v1/companies'))
app.use('/api/v1/employees', require('./api/routes/v1/employees'))
app.use('/api/v1/units/:unitId/company', require('./api/routes/v1/units.company'))

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

const listener = () => console.log(`Express listening on Port ${PORT}...`)
app.listen(PORT, listener)
const { MONGO_DB, NODE_ENV, PORT } = process.env
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

if (MONGO_DB) {
  const options = { useFindAndModify: false, useNewUrlParser: true }
  mongoose.connect(MONGO_DB, options)
  console.log('Connected to database!')
} else {
  console.log('MONGO_DB is not provided')
}

if (NODE_ENV === 'development') app.use(morgan('dev'))
app.use(require('body-parser').json())

app.use('/api/v1/units', require('./api/routes/units'))
// app.use('/api/v1/units/:unitId/company', require('./api/routes/units.company'))
// app.use('/api/v1/units/:unitId/company/employees', require('./api/routes/company.employees'))
//
app.use('/api/v1/companies', require('./api/routes/companies'))
app.use('/api/v1/employees', require('./api/routes/employees'))

app.use(({ status = 500, message = 'Something went wrong' }, req, res, next) => {
  res.status(status).json({ status, message })
})

const listener = () => console.log('You are doing a thing!')
app.listen(PORT, listener)

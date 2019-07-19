const { MONGO_DB, NODE_ENV, PORT } = process.env
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

if (MONGO_DB) {
    const options = { useFindAndModify: false, useNewUrlParser: true }
    mongoose.connect(MONGO_DB, options)
    console.log('Connected to database...')
} else {
  console.log('Could not connect to database!')
}

if (NODE_ENV === 'development') app.use(morgan('dev'))
app.use(require('body-parser').json())

app.use('/api/v1', require('./api/routes/units'))
app.use('/api/v1', require('./api/routes/companies'))
app.use('/api/v1', require('./api/routes/employees'))

app.use(({ status = 500, message = 'Something went wrong.'}, req, res, next) => {
    res.status(status).json({ status, message })
})

listener = () => console.log('You did a thing')
app.listen(PORT, listener)
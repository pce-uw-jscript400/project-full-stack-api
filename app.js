const { NODE_ENV, PORT } = process.env
const express = require('express')
const morgan = require('morgan')
const app = express()

if (NODE_ENV === 'development') app.use(morgan('dev'))

listener = () => console.log('You did a thing')
app.listen(PORT, listener)
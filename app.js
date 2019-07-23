const { NODE_ENV, PORT } = process.env
const express = require('express')
const morgan = require('morgan')
const app = express()


if (NODE_ENV === 'development') app.use = express(morgan('dev'))

const listener = () => console.log(`Running on PORT:${PORT}`)
app.listen(PORT, listener)
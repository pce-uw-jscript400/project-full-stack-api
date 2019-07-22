const { NODE_ENV, PORT } = process.env
const express = require('express')
const morgan = require('morgan')
const app = express()

if (NODE_ENV === 'development') app.use(morgan(dev))
// body-parser


const listener = () => console.log(`You're listening on PORT:5000`)
app.listen(PORT, listener)

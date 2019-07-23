const { PORT } = process.env
console.log(PORT)
const express = require('express')
const app = express()
// body-parser
// morgan

const listener = () => console.log(`Running on PORT:${PORT}`)
app.listen(PORT, listener)
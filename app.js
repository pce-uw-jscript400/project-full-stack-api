const { PORT } = process.env
const express = require('express')
const app = express()
// body-parser
// morgan

const listener = () => console.log(`You're listening on PORT:5000`)
app.listen(PORT, listener)

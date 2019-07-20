const { PORT } = process.env
const express = require('express')
const app = express()

const listener = () =>(console.log('begin'))
app.listen(PORT, listener)
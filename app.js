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

// Routes
app.use('/api/v1/units', require('./api/routes/v1/units'))
app.use('/api/v1/companies', require('./api/routes/v1/companies'))
app.use('/api/v1/employees', require('./api/routes/v1/employees'))
app.use('/api/v1/units/:unitId/company', require('./api/routes/v1/units.company'))

app.use(require('body-parser').json())

const listener = () => console.log(`Express listening on Port ${PORT}...`)
app.listen(PORT, listener)
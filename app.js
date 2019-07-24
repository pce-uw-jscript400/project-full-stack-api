const { MONGO_DB_CONNECTION, NODE_ENV, PORT } = process.env;
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Morgan and body-parser
if (NODE_ENV === 'development') app.use(require('morgan')('dev'));
app.use(require('body-parser').json());

// Database Connection
if (MONGO_DB_CONNECTION) {
    mongoose.connect(MONGO_DB_CONNECTION, { useNewUrlParser: true, useFindAndModify: false });
    console.log('Connected to database...');
  } else {
    console.log('Could not connect to database!');
  }

// Routes
app.use('/api/v1/units', require('./api/routes/units'));
// Commented out as i decided to load all routes into units.js 
//app.use('/api/v1/units/:id/company', require('./api/routes/units.company'));
//app.use('/api/v1/units/:id/company/employees', require('./api/routes/company.employees'));

// Server Listener
const listener = () => console.log ('Test Message');
app.listen(PORT,listener);

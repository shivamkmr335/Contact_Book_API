// versions of npm packages used
//      JOI       => 13.1.0
//      Mongoose  => 5.0.2
//      Express   => 5.5.1


const Joi = require('joi');
const mongoose = require('mongoose');
const customers = require('./routes/customers');
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/contacts')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/customers', customers);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
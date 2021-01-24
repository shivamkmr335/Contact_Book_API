const bcrypt = require('bcrypt');
const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// While inserting a new data,. we check if a given mail ID already exists? if yes then that json object is dropped

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const tmp = await Customer.find({ email: req.body.email });
  if (tmp.length != 0) {
    res.send('The User with given Mail ID is already Registred');
  }
  else {
    let customer = new Customer({
      Fname: req.body.Fname,
      Lname: req.body.Lname,
      isAdmin: req.body.isAdmin,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);

    customer = await customer.save();

    res.send({
      Fname: customer.Fname,
      Lname: customer.Lname,
      email: customer.email,
      phone: customer.phone,
      isAdmin: customer.isAdmin
    });
  }
});

//  the update(PUT) request rquires mail ID for the updation of data

router.put('/:text', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const temp = await Customer.findOne({ email: req.params.text });
  if (!temp || (temp && temp.length == 0)) return res.status(404).send('The customer with the given mail ID was not found.');

  // here we will check req.password with previously stored password

  const validPassword = await bcrypt.compare(req.body.password, temp.password)

  if (!validPassword) {
    return res.status(400).send('Invalid email or password.. Soory Cannot Update your Data');
  }

  const customer = await Customer.update(temp,
    {
      Fname: req.body.Fname,
      Lname: req.body.Lname,
      isAdmin: req.body.isGold,
      phone: req.body.phone,
      email: req.body.email
    }, { new: true });

  res.send(customer);
});

//  the delete request rquires mail ID for the deletion of data

router.delete('/:text', async (req, res) => {
  const temp = await Customer.findOne({ email: req.params.text });

  if (!temp || (temp && temp.length == 0)) return res.status(404).send('The customer with the given mail ID was not found.');

  const validPassword = await bcrypt.compare(req.body.password, temp.password)

  if (!validPassword) {
    return res.status(400).send('Invalid email or password.. Sorry Cannot Delete your Data');
  }

  if (temp.isAdmin == true) {
    return res.status(404).send('SORRY... But the ADMIN account cannot be deleted from the database');
  }
  const customer = await Customer.remove(temp);
  res.send(customer);
});


// To handle GET request for both name as well as email  

router.get('/:text', async (req, res) => {

  var customer = await Customer.find({ email: req.params.text });
  if (!customer || (customer && customer.length == 0)) {
    customer = await Customer.find({ Fname: req.params.text });
  }
  if (!customer || (customer && customer.length == 0)) {
    return res.status(404).send('The customer with the given name/mail was not found.');
  }
  res.send(customer);
});



module.exports = router; 
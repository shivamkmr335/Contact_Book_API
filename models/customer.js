const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  Fname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  Lname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  isAdmin: {
    type: Boolean,
    default: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 13
  },
  email:{
    type: String,
    unique: true,
    required: true,
    minlength: 8,
    maxlength: 255
  },
  // In mongoDB we are storing hashed password so thats why we have set its size to 1024
  password:{
    type: String,
    unique: true,
    required: true,
    maxlength: 1024
  },

}));

function validateCustomer(customer) {
  const schema = {
    Fname: Joi.string().min(3).max(50).required(),
    Lname: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(10).max(13).required(),
    isAdmin: Joi.boolean(),
    email: Joi.string().min(8).max(255).required().email(),
    password:Joi.string().min(4).max(255).required(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;
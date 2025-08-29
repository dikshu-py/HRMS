// models/Item.js
const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  email: {
    type : String,
    unique : true
  },
  password : String,
  name:String,

});

const Login = mongoose.model('User', loginSchema);

module.exports = Login;

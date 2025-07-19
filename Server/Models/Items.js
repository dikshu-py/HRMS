// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type : String,
    unique : true
  },
  email: String,
  number : String,
  position : String,
  status : String,
  experience: Number,
  image : String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

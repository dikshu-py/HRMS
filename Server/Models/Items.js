// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type : String,
    unique : true
  },
  price: Number,
  brand : String,
  category : String,
  detail: String,
  image : String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

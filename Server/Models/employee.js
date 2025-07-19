

const mongoose = require('mongoose');


const employeeschema = new mongoose.Schema({
   name: {
    type : String,
    unique : true
  },
  email: {
    type : String,
    unique : true
  },
  number : String,
  position : String,
  role : String,
  department : String,
  experience: Number,
  joining : Date,
  image : String,
  

},
 {
    timestamps: true, //  adds joining date in Schema
  }
)

const Item = mongoose.model("Employee",employeeschema)
module.exports = Item
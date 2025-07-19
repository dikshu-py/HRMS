

const mongoose = require('mongoose');


const attendenceschema = new mongoose.Schema({
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
  task: String,
  status : String,
  image : String,
  

},
 {
    timestamps: true, //  adds joining date in Schema
  }
)

const Item = mongoose.model("Attendence",attendenceschema)
module.exports = Item
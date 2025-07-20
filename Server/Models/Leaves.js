const mongoose = require('mongoose');


const LeaveModel = new mongoose.Schema({
    desigination : String,
    reason : String ,
    image : String,
    name : String ,
    leavedate  : Date,
    status : String
})

const Item  = mongoose.model('Leaves',LeaveModel)

module.exports = Item;
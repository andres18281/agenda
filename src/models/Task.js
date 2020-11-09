const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
  title: String,
  nivel:Number,
  dateend:Date,
  idUser:String
});

module.exports = mongoose.model('Task', Task);

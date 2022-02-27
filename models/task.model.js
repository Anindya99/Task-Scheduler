const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  day:{
    type:Date,
    required:true
  },
  reminder:{
      type: Boolean,
      default:true
  }

});

const Task = mongoose.model('task', TaskSchema);

module.exports= Task;
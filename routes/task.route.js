const express = require('express');
const router = express.Router();
const auth= require('../middleware/auth');
const decode= require('jwt-decode')

//bringing task.model.js from models folder
const Task=require('../models/task.model');



/**
 * @route   GET api/tasks
 * @desc    Get All tasks
 * @access  Private
 */
 router.get(

   '/', 
   auth,
   async (req, res) => {
    try {
      const token = await req.headers["x-auth-token"].split(" ")[1];
      const tasks = await Task.find({userId:decode(token)._id}).sort({day:-1});
      if (!tasks) throw Error('No items');
  
      res.status(200).json(tasks);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
}

);

/**
 * @route   POST api/tasks
 * @desc    post a task
 * @access  Private
 */
 router.post(
   '/', 
   auth,
  async (req, res) => {
  const newTask = new Task({
    userId: req.body.userId,
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder
  });
  try{
    //const { validationResult } = require("express-validator");
    const task = await newTask.save();
    res.status(200).json(task);
  }catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

);


/**
 * @route   DELETE api/tasks
 * @desc    delete a task
 * @access  Private
 */
 router.delete(
  '/:id', 
  auth,
 async (req, res) => {
try {
  const task = await Task.findById(req.params.id);
  if (!task) throw Error('No item found');
  const removed = await task.remove();
  if (!removed)
    throw Error('Something went wrong while trying to delete the item');

  res.status(200).json({ success: true });
 }catch (e) {
  res.status(400).json({ msg: e.message }); 
 }
}
);


/**
 * @route   PUT api/tasks
 * @desc    edit a task
 * @access  Private
 */
 router.put(
  '/:id', 
  auth,
 async (req, res) => {
  const newTask = new Task({
    userId: req.body.userId,
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder
  });
  try{
    
    await Task.findOneAndUpdate(
    {_id:req.params.id},
    {userId:newTask.userId,text:newTask.text,day:newTask.day,reminder:newTask.reminder})
    res.status(200).json(newTask.text);
  }catch (e) {
    res.status(400).json({ msg: e.message });
  }
} 
 );


module.exports=router;
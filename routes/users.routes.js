const express = require('express');
const router = express.Router();
const config= require('config');
const jwt=require('jsonwebtoken');
const auth= require('../middleware/auth');
const decode= require('jwt-decode')

//bringing users.model.js from models folder
const User=require('../models/users.model');


/**
 * @route   GET api/users
 * @desc    Get the user of the token
 * @access  Private
 */
 router.get(

    '/', 
    auth,
    async (req, res) => {
        try {
            const token = await req.headers["x-auth-token"].split(" ")[1];

            const user = await User.findById(decode(token)._id).select('-password');
            
            if (!user) throw Error('No users exist');

            res.json(user);
          } catch (e) {
            res.status(400).json({ msg: e.message });
          }
 }
 
 );



module.exports=router;
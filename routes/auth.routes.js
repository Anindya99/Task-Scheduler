const express = require('express');
const router = express.Router();
const bcrypt =require('bcryptjs')
//const config= require('config');
const { jwtSecret } = require("../config/config");
const jwt=require('jsonwebtoken')

//bringing users.model.js from models folder
const User=require('../models/users.model');



/**
 * @route   POST api/users/auth
 * @desc    Login user
 * @access  Public
 */
 router.post(
    '/login', 
    async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({msg:'User does not exist , please register.'})
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({msg:'Invalid credentials'})
      /* throw Error('Invalid credentials'); */
  
      const token = jwt.sign({ _id: user._id,name:user.name,email:user.email }, jwtSecret, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });


/**
 * @route   POST api/users/register
 * @desc    Register new user
 * @access  Public
 */
 router.post(
    '/register', 
     (req, res) => {
        const {name,email,password} = req.body;

        //validation
        if(!email || !name || !password){
            return res.status(400).json({msg:'Please enter all fields'})
        }

        //check existing user
        User.findOne({email})
            .then(user=>{
                if(user) return res.status(400).json({msg:'This email is already registered'})

                const newUser= new User({
                    name,
                    email,
                    password
                })

                //Create salt and hash
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password=hash;
                        try{
                        newUser.save()
                            .then(user=>{

                                jwt.sign(
                                    {_id:user._id},
                                    jwtSecret,
                                    {expiresIn:3600},
                                    (err,token)=>{
                                        if(err) throw err;
                                        res.status(200).json({
                                            token,
                                            user:{
                                                _id:user._id,
                                                name:user.name,
                                                email:user.email
                                            }
                                        })
                                    }
                                    )
                            })
                        }catch (e) {
                            res.status(400).json({ msg: e.message });
                          }
                    })
                })
            })
     }
 );

module.exports=router;
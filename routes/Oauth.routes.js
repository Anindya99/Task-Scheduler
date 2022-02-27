const { OAuth2Client } = require('google-auth-library')
const express = require('express');
const router = express.Router();
//const config= require('config');
const { googleClientId,jwtSecret } = require("../config/config");
const jwt=require('jsonwebtoken')
const client = new OAuth2Client(googleClientId)

//bringing users.model.js from models folder
const User=require('../models/users.model');

/**
 * @route   POST /api/users/Oauth/google
 * @desc    Login user
 * @access  Public
 */
 router.post(
    '/google', 
    async (req, res) => {
      try{
        //const token =  await req.headers["x-auth-token"].split(" ")[1];
        const token=req.body.sendToken
        //console.log(token)
        //console.log(token)
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: googleClientId
        });

      
      const { name, email} = ticket.getPayload();  
      console.log(name) 
      User.findOne({email})
        .then(user=>{
          if(!user){
            const newUser= new User({
              name,
              email
            })
            try{
              newUser.save()
                  .then(user=>{

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
                  })
              }catch (e) {
                  res.status(400).json({ msg: e.message });
                }
          }
          else{
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
          }
        })

      }catch(e){
        res.status(400).json({ msg: e.message });
      }
    }
  );

   
  /**
 * @route   POST /api/users/Oauth/google/callback
 * @desc    Login user
 * @access  Public
 */
  /*router.post(
    '/google/callback',
    passport.authenticate("google",{scope: ["profile"],session:false}),
     async (req, res) => {
      try{
        const user=req.user
        jwt.sign(
          {_id:user._id},
          config.get('jwtSecret'),
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
      }catch(e){
        res.status(400).json({ msg: e.message });
      }
    } 
  ); */

  module.exports=router;
import React from 'react'
//import { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import './login.css'
//import AuthStore from '../../middleware/AuthStore'
import GoogleLogin from 'react-google-login'
//import config from '../../config'
import Axios from 'axios'

const LoginGoogle = ({action,text}) => {
    
    
     const timetoLogin=(res)=>{
      //console.log(res.tokenId)
      //dont send something directlyint the body send as object here key is sendToken(can be anything) 
      //and the token is res.tokenId
        Axios
        .post('/api/users/Oauth/google',{sendToken:res.tokenId})
        .then(res=>{
            action(res.data.token)
        })
        .catch(err=>{
            if (err.response) {
                // Request made and server responded
                console.log(err.response.data.msg);
                console.log(err.response.status);
                //console.log(err.response.headers);
                //seterror(err.response.data.msg)
              } else if (err.request) {
                // The request was made but no response was received
                console.log(err.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err);
              }
        })
    }
    
  return (
    <>
      {/* <GoogleLogin 
      clientId={config.googleClientId}
      onSuccess={timetoLogin}
      onFailure={timetoLogin}
      cookiePolicy='none'
      buttonText="Log in with Google"
      className='buttongoogle'
      > 
      </GoogleLogin> */}

      <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
      cookiePolicy='none'
      render={renderProps=>(
        <button onClick={renderProps.onClick}
        disabled={renderProps.disabled} className="buttongoogle">
        <img src="icons/google.svg" alt="google login" className="icong"></img>
        <span className="buttongText">{text} with Google</span>
        </button>
      )}
      onSuccess={timetoLogin}
      onFailure={timetoLogin}
      >
          
      </GoogleLogin>

      </>
    
    
  )
}

export default LoginGoogle
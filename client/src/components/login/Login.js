import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import AuthStore from '../../middleware/AuthStore'
import LoginGoogle from './LoginGoogle'
import CssBaseline from "@mui/material/CssBaseline";
import Headerlogin from './Headerlogin';
import Alert from '@mui/material/Alert';
import Axios from 'axios'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error,seterror]=useState([])
    const[success,setsuccess]=useState(false) 
    
    /* useEffect(() => {
        setEmail('')
        setPassword('')
        seterror({})
      }, [success]); */
    const onSubmit = (e) => {
        e.preventDefault()
        seterror([])
        if (!email) {
            seterror(['Please add an email'])
            //alert('')
            return
        }
        if(!password){
            seterror(['Please add a password'])
            //alert('Please add a password')
            return
        }
        
        const info={email,password};
        
        Axios
        .post('/api/users/auth/login',info)
        .then(res=>{
            setsuccess(true)
            setEmail('')
            setPassword('')
            seterror([])
            AuthStore.storeJWT(res.data.token)    
            window.location.href = "/";
            
        })
        .catch(err=>{
            if (err.response) {
                // Request made and server responded
                console.log(err.response.data.msg);
                console.log(err.response.status);
                //console.log(err.response.headers);
                const abc=[]
                abc.push(err.response.data.msg)
                seterror(abc)
              } else if (err.request) {
                // The request was made but no response was received
                console.log(err.request);
                seterror(['Failed to login'])
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err);
                seterror(['Failed to login'])
              }
        })
        
    }
    
    const onLoginGoogle=(token)=>{
        setsuccess(true)
        setEmail('')
        setPassword('')
        seterror([])
        AuthStore.storeJWT(token)    
        window.location.href = "/";
    }

  return (
      <>
      <CssBaseline/>
      <Headerlogin />
   <div className="login-form">
       
            <form className="form-elements" >

                <h2>Log in</h2>

                {error.length>0 &&
                <Alert severity="error">{error[0]}</Alert>
                }
                {success &&
                    <Alert severity="success">Login Successfull</Alert>
                }

                <div className="login-form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="login-form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" required
                   value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {/* <div className="login-form-group">
                    <div className="login-custom-control custom-checkbox">
                        <input type="checkbox" className="login-custom-control-input" id="customCheck1" />
                        <label htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <button type="submit" onClick={onSubmit} className="btn btn-dark btn-lg btn-block">Sign in</button>

                <h3>or</h3>
                
                <LoginGoogle action={onLoginGoogle} text={'Log in'}/>
                
                <p className="forgot-password text-right">
                    Do not have an account ? <Link to="/register">Register Here</Link>
                </p>
            </form>
            
            </div>
        </>
  )
}

export default Login;
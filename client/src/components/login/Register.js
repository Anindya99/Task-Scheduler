import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import AuthStore from '../../middleware/AuthStore';
import LoginGoogle from './LoginGoogle';
import CssBaseline from "@mui/material/CssBaseline";
import Headerlogin from './Headerlogin';
import Alert from '@mui/material/Alert';
import Axios from 'axios';



const Register=()=>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pass2, setPass2] = useState('')
    const [error,seterror]=useState([])
    const[success,setsuccess]=useState(false)


    const onSubmit = (e) => {
        e.preventDefault()
        seterror([])
        if (!name) {
            seterror(['Please add a name'])
            return
        }
        if (!email) {
            seterror(['Please add an email'])
            return
        }
        if(!password){
            seterror(['Please add a password'])
            return
        }
        if(!pass2){
            seterror(['Please add confirm password'])
            return
        }
        if(password !==pass2){
            //alert('Password and confirm password is not same')
            seterror(['Password and confirm password is not same'])
            return
        }
        
        const info={name,email,password};
        
        Axios
        .post('/api/users/auth/register',info)
        .then(res=>{
            setsuccess(true)
            setName('')
            setEmail('')
            setPassword('')
            setPass2('')
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
                seterror(['Failed to register'])
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err);
                seterror(['Failed to register'])
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
            <div className="login-form ">
            <form className="form-elements register-form-elements" >
                <h2>Sign Up</h2>

                {success &&
                    <Alert severity="success">Registration Successfull</Alert>
                }

                <LoginGoogle action={onLoginGoogle} text={'Register'}/>

                <h3>or</h3>

                {error.length>0 &&
                <Alert severity="error">{error[0]}</Alert>
                }

                <div className="login-form-group">
                    <label>Name</label>
                    <input type="text" className="login-form-control" placeholder="Enter name" 
                    value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="login-form-group">
                    <label>Email</label>
                    <input type="email" className="login-form-control" placeholder="Enter email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="login-form-group">
                    <label>Password</label>
                    <input type="password" className="login-form-control" placeholder="Enter password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="login-form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="login-form-control" placeholder="Enter password" 
                    value={pass2} onChange={(e) => setPass2(e.target.value)}/>
                </div>

                <button type="submit" onClick={onSubmit} className="btn btn-dark btn-lg btn-block btn-register">Register</button>

                
                {/* <button  className="buttongoogle">
                    <img src="icons/google.svg" alt="google login" className="icong"></img>
                    <span className="buttongText">Register with Google</span>
                </button> */}

                

                <p className="forgot-password text-right">
                    Have an account ? <Link to="/login">Log In</Link>
                </p>
                
            </form>
            </div>
            </>
        );
}
export default Register;

import React, { useState,useEffect } from "react";
import Login from './components/login/Login';
import Register from './components/login/Register';
import Dashboard  from './Dashboard';
import  Cover from './components/Cover';
import { BrowserRouter, Route, Routes,Link,Switch } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

const App= ()=> {
  
        return (
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
            <BrowserRouter>
            <div className="app">
            <Routes>
            <Route exact={true} path='/' element={<Dashboard />}/>
            <Route exact={true} path='/login' element={<Login />}/>
            <Route exact={true} path='/register' element={<Register />}/>
            <Route exact={true} path='/cover' element={<Cover/>}/>
            </Routes>
            </div>
            </BrowserRouter>
          </GoogleOAuthProvider>
        )
 
 
  
}

export default App;



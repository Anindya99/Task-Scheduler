import React from 'react';
import { Link } from "react-router-dom";


const Headerlogin = () => {
  return (
    
      <header className="headerlogin" >
        <h1 ><Link to="/cover" style={{color: 'inherit', textDecoration: 'none' }}>Task Scheduler</Link></h1>
      </header>
    
  )
};



export default Headerlogin;

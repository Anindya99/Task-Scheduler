import React from 'react'
import { Link } from "react-router-dom";

const Cover = () => {
  return (
    <div className='cover'>
    <div className='box1'>
      <img src="icons/time2.png" alt="cover" className="coverphoto"></img>
    </div>
   <div className='box2'>
     <blockquote>
    Your greatest resource is your time .
    <span>Brian Tracy</span>
    </blockquote>
   </div>
   <div className='box3'>
   <Link to="/login" style={{color: 'inherit', textDecoration: 'none' }}><p className='box3text'><span>Log in to Task Scheduler</span></p></Link>
   </div>
  </div>
  )
}

export default Cover
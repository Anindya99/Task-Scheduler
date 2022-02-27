import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import {FaHeart} from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className='dash-footer'>
        <CssBaseline/>
      <p>Copyright &copy; 2022</p>
      <span>
    Made with <FaHeart id='love-icon'/> by <a href="https://github.com/Anindya99" style={{color:'wheat'}} target="_blank">Anindya</a>
    </span>
    </footer>
  )
}

export default Footer
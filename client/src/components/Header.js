import {MdLogout} from 'react-icons/md'


const Header = ({title,logout}) => {
  return (
    
      <header className="header" >
        
        <h1 >{title}</h1>
        <MdLogout className='btn' id='logout' onClick={logout}/>
      </header>
    
  )
};

Header.defaultProps={
  title:'Task Scheduler',
}

export default Header;

import { NavLink } from 'react-router-dom'
import React from 'react'
import links from '../utils/links'
import { useAppContext } from '../context/appContext'

const NavLinks = () => {
  const { toggleSideBar } = useAppContext();
  return (
    <div className='nav-links'>

     {links.map((link) => {
     const { text, path, id, icon } = link;
      return (
    
      <NavLink
      to={path} 
     key={id} 
      onClick={toggleSideBar} 
      activeclassname='active' 
      className='nav-link'
        >
        <span className='icon'>{icon}</span> 
          {text} 
          </NavLink>
              );
            })}
          </div>
    
  )
}

export default NavLinks


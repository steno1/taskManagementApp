import { NavLink } from 'react-router-dom'
import React from 'react'
import links from '../utils/links'
import { useAppContext } from '../context/appContext'

const NavLinks = () => {
  const { toggleSideBar } = useAppContext();
  return (
    <div className='nav-links'>
   {/* Map through the links array and render NavLink for each link */}
     {links.map((link) => {
     const { text, path, id, icon } = link;
      return (
      // Navigation link with the link's text, icon, and onClick handler
      <NavLink
      to={path} // Set the link's destination URL
     key={id} // Use the link's id as the unique key for efficient rendering
      onClick={toggleSideBar} // Call toggleSideBar function when a link is clicked to close the sidebar
      activeclassname='active' // Apply the 'active' class when the link's URL matches the current URL
      className='nav-link' // Set the default class for all navigation links
        >
        <span className='icon'>{icon}</span> {/* Display the link's icon */}
          {text} {/* Display the link's text */}
          </NavLink>
              );
            })}
          </div>
    
  )
}

export default NavLinks


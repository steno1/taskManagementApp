import {FaAlignLeft, FaCaretDown, FaUserCircle} from 'react-icons/fa';

import BlueLogo from './logo';
import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { useAppContext } from "../context/appContext.js"
import { useState } from 'react';

const Navbar = () => {
  const [showLogout, setShowLogout]=useState(false)
  const {toggleSideBar, logoutUser, user}=useAppContext();

  return (
    <Wrapper>
     <div className='nav-center'>

      <button className='toggle-btn' 
      onClick={toggleSideBar}>
        <FaAlignLeft/>
      </button>
      <div>
        <BlueLogo/>
        <h3 className='logo-text'>Dashboard</h3>
      </div>
     
     <div className='btn-container'>
<button type='button' className='btn' 
 onClick={()=>setShowLogout(!showLogout)}>
  <FaUserCircle/>
  {user?.name}
  <FaCaretDown/>
 </button>
 <div className={showLogout?'dropdown show-dropdown':"dropdown"}>
  <button className='dropdown-btn' 
  onClick={logoutUser}>
    logOut</button>
 </div>
     </div>
     </div>
     
    </Wrapper>
  )
}

export default Navbar

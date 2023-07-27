import BlueLogo from './logo'
import NavLinks from './NavLinks'
import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useAppContext } from '../context/appContext'

const BigSideBar = () => {
  const {showSideBar}=useAppContext()
  return (
    <Wrapper>
<div className={
  showSideBar?"sidebar-container":"sidebar-container show-sidebar"}>

<div className='content'>
<header>
  <BlueLogo/>
</header>
<NavLinks/>
</div>
</div>
    </Wrapper>
     
    
  )
}

export default BigSideBar

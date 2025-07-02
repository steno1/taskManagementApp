
import BlueLogo from './logo'; 
import { FaTimes } from 'react-icons/fa'; 
import NavLinks from './NavLinks';
import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar'; 
import { useAppContext } from '../context/appContext'; 

const SmallSideBar = () => {
 
  const { showSideBar, toggleSideBar } = useAppContext();
  return (
    <Wrapper>
      <div className={showSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
  
          <button type='button' className='close-btn' onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <BlueLogo /> {/* Display the BlueLogo component */}
          </header>
          <NavLinks toggleSidebar={toggleSideBar}/>
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSideBar;

// Import required modules and components

import BlueLogo from './logo'; // Import the BlueLogo component from './logo' file
import { FaTimes } from 'react-icons/fa'; // Import the FaTimes icon from react-icons/fa
import NavLinks from './NavLinks';
import React from 'react'; // Import the React library
import Wrapper from '../assets/wrappers/SmallSidebar'; // Import the Wrapper component from '../assets/wrappers/SmallSidebar' file
import { useAppContext } from '../context/appContext'; // Import the useAppContext hook from '../context/appContext' file

// Define the SmallSideBar component
const SmallSideBar = () => {
  // Access shared state and functions from the application context using the useAppContext hook
  const { showSideBar, toggleSideBar } = useAppContext();

  // Render the SmallSideBar component
  return (
    // Use the Wrapper component to style the sidebar container
    <Wrapper>
      <div className={showSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          {/* Button to close the sidebar */}
          <button type='button' className='close-btn' onClick={toggleSideBar}>
            <FaTimes /> {/* Display the FaTimes icon from react-icons/fa */}
          </button>
          {/* Header with the BlueLogo component */}
          <header>
            <BlueLogo /> {/* Display the BlueLogo component */}
          </header>
          <NavLinks toggleSidebar={toggleSideBar}/>
        </div>
      </div>
    </Wrapper>
  );
};

// Export the SmallSideBar component as the default export
export default SmallSideBar;

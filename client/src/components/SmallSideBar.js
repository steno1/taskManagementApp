// Import required modules and components

import BlueLogo from './logo'; // Import the BlueLogo component from './logo' file
import { FaTimes } from 'react-icons/fa'; // Import the FaTimes icon from react-icons/fa
import { NavLink } from 'react-router-dom'; // Import the NavLink component from react-router-dom
import React from 'react'; // Import the React library
import Wrapper from '../assets/wrappers/SmallSidebar'; // Import the Wrapper component from '../assets/wrappers/SmallSidebar' file
import links from '../utils/links'; // Import the links array from '../utils/links' file
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
                  activeClassName='active' // Apply the 'active' class when the link's URL matches the current URL
                  className='nav-link' // Set the default class for all navigation links
                >
                  <span className='icon'>{icon}</span> {/* Display the link's icon */}
                  {text} {/* Display the link's text */}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

// Export the SmallSideBar component as the default export
export default SmallSideBar;

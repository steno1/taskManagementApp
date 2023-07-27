// Importing required components from the '../components' directory and 'react-router-dom' library.

import { BigSideBar, Navbar, SmallSideBar } from '../components';

import { Outlet } from 'react-router-dom';
import React from 'react';
import Wrapper from '../assets/wrappers/SharedLayout';

// Importing the 'React' object from the 'react' library.


// Importing a component named 'Wrapper' from the '../assets/wrappers/SharedLayout' directory.


// Defining the 'SharedLayout' functional component.
const SharedLayout = () => {
  return (
    // Wrapping the entire component in a 'Wrapper' component.
    <Wrapper>
      <main className='dashboard'>
        {/* Rendering the 'SmallSideBar' component. */}
        <SmallSideBar />
        
        {/* Rendering the 'BigSideBar' component. */}
        <BigSideBar />

        <div>
          {/* Rendering the 'Navbar' component. */}
          <Navbar />

          <div className='dashboard-page'>
            {/* Rendering the child components defined by the 'Outlet' component. */}
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

// Exporting the 'SharedLayout' component as the default export.
export default SharedLayout;

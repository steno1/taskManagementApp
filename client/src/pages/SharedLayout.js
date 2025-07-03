
import { BigSideBar, Navbar, SmallSideBar } from '../components';

import { Outlet } from 'react-router-dom';
import React from 'react';
import Wrapper from '../assets/wrappers/SharedLayout';

const SharedLayout = () => {
  return (

    <Wrapper>
      <main className='dashboard'>
  
        <SmallSideBar />
      
        <BigSideBar />

        <div>
          <Navbar />

          <div className='dashboard-page'>
    
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;

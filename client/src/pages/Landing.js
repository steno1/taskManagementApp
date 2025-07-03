

import { BlueLogo } from '../components'; 
import { Link } from 'react-router-dom';
import React from 'react';
import Wrapper from '../assets/wrappers/LandingPage.js'; 
import main from "../assets/images/main.svg"; 

const Landing = () => {
  return (
    <Wrapper>
  
      <nav className='Logo'>
        <BlueLogo />
      </nav>
     
      <div className='container page'>
     
        <div className='info'>
       
          <h1>Daily<span>task</span>app</h1>
         
          <p>DailyTaskApp revolutionizes your task management by providing a robust platform to organize, track, and optimize your daily tasks. With its user-friendly design, advanced features, and insightful statistics, achieving your goals has never been more convenient and efficient.
             Experience the power of productivity with DailyTaskApp today.</p>

          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
    
        <img src={main} alt='mainPics' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;

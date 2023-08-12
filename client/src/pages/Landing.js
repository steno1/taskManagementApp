// Importing necessary components and modules

import { BlueLogo } from '../components'; // Assuming BlueLogo is a custom component
import { Link } from 'react-router-dom';
import React from 'react';
import Wrapper from '../assets/wrappers/LandingPage.js'; // Assuming Wrapper is a custom component
import main from "../assets/images/main.svg"; // Assuming main is the image source

const Landing = () => {
  return (
    // Using the Wrapper component to provide a common layout structure
    <Wrapper>
      {/* Navigation containing the BlueLogo component */}
      <nav className='Logo'>
        <BlueLogo />
      </nav>
      {/* Container div with the class 'page' */}
      <div className='container page'>
        {/* Information section */}
        <div className='info'>
          {/* Heading with the text 'Dailytaskapp' */}
          <h1>Daily<span>task</span>app</h1>
          {/* Paragraph with some Lorem Ipsum text */}
          <p>DailyTaskApp revolutionizes your task management by providing a robust platform to organize, track, and optimize your daily tasks. With its user-friendly design, advanced features, and insightful statistics, achieving your goals has never been more convenient and efficient.
             Experience the power of productivity with DailyTaskApp today.</p>

          {/* Link to the '/register' route with a button */}
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        {/* Image with the source from the 'main' variable */}
        <img src={main} alt='mainPics' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;

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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id tortor elit. Phasellus vel justo nec massa fermentum maximus. Aliquam et posuere nulla. Proin pharetra tempus turpis et vestibulum. Vestibulum id nisl sed dui maximus lacinia. Cras nec vulputate lectus. Nunc auctor lectus a risus egestas efficitur. Nulla sed nunc vitae massa pretium lobortis quis quis sapien. Morbi dictum posuere ipsum, ut mollis nunc condimentum vitae. Fusce tempus, diam quis pellentesque tempus, nibh magna feugiat lorem, non vehicula lectus dolor ut arcu. Donec fermentum tortor vitae ante mattis, vel lobortis mauris maximus. Donec sodales in lacus eget dignissim. Cras non eros nec risus mollis venenatis quis et lacus. Vivamus
          lorem tortor, aliquet eget leo vitae, luctus facilisis lorem.</p>

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

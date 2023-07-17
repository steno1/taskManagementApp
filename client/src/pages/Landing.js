import {BlueLogo} from '../components'
import { Link } from 'react-router-dom'
import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage.js'
import main from "../assets/images/main.svg"

const Landing = () => {
  return ( 
  
  <Wrapper>
    <nav className='Logo'>
        <BlueLogo/>
      </nav>
    <div className='container page'>
      
      <div className='info'>
<h1>Daily<span>task</span>app</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id tortor elit. Phasellus vel justo nec massa fermentum maximus. Aliquam et posuere nulla. Proin pharetra tempus turpis et vestibulum. Vestibulum id nisl sed dui maximus lacinia. Cras nec vulputate lectus. Nunc auctor lectus a risus egestas efficitur. Nulla sed nunc vitae massa pretium lobortis quis quis sapien. Morbi dictum posuere ipsum, ut mollis nunc condimentum vitae. Fusce tempus, diam quis pellentesque tempus, nibh magna feugiat lorem, non vehicula lectus dolor ut arcu. Donec fermentum tortor vitae ante mattis, vel lobortis mauris maximus. Donec sodales in lacus eget dignissim. Cras non eros nec risus mollis venenatis quis et lacus. Vivamus 
  lorem tortor, aliquet eget leo vitae, luctus facilisis lorem.</p>

      <Link to='/register' className='btn btn-hero'>
        Login/Register
      </Link>
    </div>
    <img src={main} alt='mainPics' className='img main-img'/>
    </div>
    </Wrapper>
    )
}

export default Landing

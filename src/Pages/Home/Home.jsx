import React from 'react';
import { Element } from 'react-scroll';
import './home.css'
import Hero from '../../Components/Hero/Hero';
import About from '../../Components/About/About';
import Finals from '../../Components/finals/Finals';
import Mentors from '../../Components/Mentors/Mentors';

function Home(){
  return (
    <main>
      <Hero />
      <About />
      <Finals />
      <Mentors />
      

      <Element name="contact">
        <section id="contact">
          
        </section>
      </Element>
      
      <Element name="login">
        <section id="login"></section>
      </Element>
    </main>
  )
}

export default Home

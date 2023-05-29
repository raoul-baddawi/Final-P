import React from 'react';
import './home.css'
import Hero from '../../Components/Hero/Hero';
import About from '../../Components/About/About';
import Finals from '../../Components/finals/Finals';
import Mentors from '../../Components/Mentors/Mentors';
import Skills from '../../Components/Myskills/Skills';
import Projects from '../../Components/Projects/Projects';
import Footer from '../../Components/Footer/Footer';

function Home(){
  return (
    <main>
      <Hero />
      <About />
      <Finals />
      <Mentors />
      <Skills />
      <Projects />
      <Footer />
      
    </main>
  )
}

export default Home

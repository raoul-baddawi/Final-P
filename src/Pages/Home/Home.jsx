import React from 'react';
import { Element } from 'react-scroll';
import './home.css'
import Hero from '../../Components/Hero/Hero';
import About from '../../Components/About/About';

function Home(){
  return (
    <main>
      <Hero />
      <About />

      <Element name="developers">
        <section id="developers"></section>
      </Element>

      <Element name="skills">
        <section id="skills"></section>
      </Element>

      <Element name="projects">
        <section id="projects"></section>
      </Element>

      <Element name="contact">
        <section id="contact"></section>
      </Element>
      
      <Element name="login">
        <section id="login"></section>
      </Element>
    </main>
  )
}

export default Home

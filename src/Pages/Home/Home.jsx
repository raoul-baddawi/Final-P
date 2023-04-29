import React from 'react';
import { Element } from 'react-scroll';
import './home.css'

function Home(){
  return (
    <main>
      <Element name="home">
        <section id="hero"></section>
      </Element>

      <Element name="developers">
        <section id="developers"></section>
      </Element>

      <Element name="skills">
        <section id="skills"></section>
      </Element>

      <Element name="projects">
        <section id="projects"></section>
      </Element>

      <Element name="about">
        <section id="about"></section>
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

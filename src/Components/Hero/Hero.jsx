import React from 'react'
import './hero.css'
import { Element, Link } from 'react-scroll';
import HeroSvg from '../svg-comp/HeroSvg';
import raoul from '../../Assets/raoul(3).jpeg'

const Hero = () => {
  return (
    <Element name="home">
      <section id="hero">
        <div className="hero-left">
          <div className="left-container">
            <h1>Hello!</h1>
            <h1><span>I'm</span> Raoul Baddawi</h1>
            <p>
              I’m a Full Stack Web Developer, who knows 
              that anything can be done, and prefers to have
              a magical touch on every piece of art he contributes to.
            </p>
            <p>See more about this website</p>
            <Link
            to="developers"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            tabIndex={0}
            >
              See more
            </Link>
          </div>
        </div>
        <div className="hero-right">
          <img src={raoul} alt="owner pic" />
          <HeroSvg />
        </div>
      </section>
    </Element>
  )
}

export default Hero

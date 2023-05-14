import React from 'react'
import { Element } from 'react-scroll';
import './about.css'

const About = () => {
  return (
    <Element name="about">
        <section id="about">
          <div className="about-left">
            <div className="about-badge"></div>
          </div>
          <div className="about-right">
            <h1>About This Website</h1>
            <p><span>Gratitude</span> is a powerful force that can transform our lives and the lives of those around us. When we take the time to <span>appreciate</span> the people and experiences that have helped shape us, we open ourselves up to a world of possibility and growth. This website is a <span>celebration</span> of gratitude and appreciation for <span>Codi</span>, who brought us together, the <span>teammates</span> and <span>mentors</span> who have supported us along the way. May it <span>serve</span> as a reminder of the power of connection, collaboration, and community in our lives.</p>
          </div>
        </section>
    </Element>
  )
}

export default About

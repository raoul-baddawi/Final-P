import './finals.css'
import React from 'react'
import { Element } from 'react-scroll';
import Carousel from '../Carousel/carousel';

const Finals = () => {
  return (
    <Element name="finals">
        <section id="finals">
          <Carousel />
        </section>
    </Element>
  )
}

export default Finals

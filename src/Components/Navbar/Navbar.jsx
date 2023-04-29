import './navbar.css'
import React, { useState } from 'react'
import { Link } from 'react-scroll'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import logo from '../../Assets/Slice 1.png'

const Navbar = () => {
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [color, setColor] = useState(false);

  function changeColor() {
    if (window.scrollY >= 90) {
      setColor(true)
    } else {
      setColor(false)
    }
  }

  window.addEventListener('scroll', changeColor)

  function handleClick() {
    setClick(!click)
  }


  return (
    <header className={color ? 'header header-bg' : 'header'}>
      <nav>
        <a href='/' className='logo'>
          <img src={logo} alt='Logo' />
          <h1>Appreciate</h1>
        </a>
        <ul>
          <li>
            <a href='/' className={location.pathname === '/' ? 'active' : ''}>
              Home
            </a>
          </li>
          <li>
            <Link
              activeClass="active"
              to="developers"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              tabIndex={0}
            >
              Developers
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="skills"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              tabIndex={0}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="projects"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              tabIndex={0}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              tabIndex={0}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              tabIndex={0}
            >
              Contact
            </Link>
          </li>
        </ul>
        <Link
          activeClass="active"
          to="login"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          tabIndex={0}
        >
          Login
        </Link>
        <div className="burger-menu" onClick={handleClick}>
          {click ? (<FaTimes size={40}/>) : (<FaBars size={40}/>)}
        </div>
        <div className={click ? 'nav-menu active' : "nav-menu"}>
          <a href="/">Home</a>
          <a href="/developers">Developers</a>
          <a href="/skills">Skills</a>
          <a href="/projects">Projects</a>
          <a href="about">About me</a>
          <a href="contact">Contact me</a>
          <a href="login">Login</a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

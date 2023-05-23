import "./navbar.css";
import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/Slice 1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [color, setColor] = useState(false);

  function changeColor() {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  }

  window.addEventListener("scroll", changeColor);

  function handleClick() {
    setClick(!click);
  }

  return (
    <>
    {location.pathname === "/profile" ? null : ( 
      <header className={color ? "header header-bg" : "header"}>
      <nav>
        <a href="/" className="logo">
          <img src={logo} alt="Logo" />
          <h1>Appreciate</h1>
        </a>
        <ul>
          <li className="drop">
            <a href="/" className={location.pathname === "/" ? "active" : ""}>
              Home
              {location.pathname === "/" ? <FaAngleDown /> : null}
            </a>
            {location.pathname !== "/" ? null : (
              <div className="down">
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
                <Link
                  activeClass="active"
                  to="finals"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  tabIndex={0}
                >
                  Finals
                </Link>
                <Link
                  activeClass="active"
                  to="mentors"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  tabIndex={0}
                >
                  Mentors
                </Link>
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
              </div>
            )}
          </li>
          <li>
            <a
              href="/ourteam"
              className={location.pathname === "/ourteam" ? "active" : ""}
            >
              Our Team
            </a>
          </li>
          <li>
            <a
              href="/community"
              className={location.pathname === "/community" ? "active" : ""}
            >
              Community
            </a>
          </li>
          <li>
            <Link
              activeClass="active"
              to="Cvs"
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
              Contact Us
            </Link>
          </li>
        </ul>
        <a
          className="lgn"
          href="/auth"
        >
          Login
        </a>
        <div className="burger-menu" onClick={handleClick}>
          {click ? <FaTimes size={40} /> : <FaBars size={40} />}
        </div>
        <div className={click ? "nav-menu active" : "nav-menu"}>
          <a href="/">Home</a>
          <button onClick={() => navigate("/single", { state: { id: user._id } })}>Details</button>
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
    </>
  );
};

export default Navbar;

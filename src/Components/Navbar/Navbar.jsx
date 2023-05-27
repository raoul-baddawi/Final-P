import "./navbar.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/Slice 1.png";
import axios from "axios";
import noprofile from '../../Assets/noimage.png'
const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [color, setColor] = useState(false);
  const [drop, setDrop] = useState([]);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const res = await axios.get(`http://localhost:8800/profile/${user._id}`);
        if(res.data.message === "No"){
          setDrop(null);
        } else{
          setDrop(res.data)
        }
      } catch (err) {
        console.log("Error occurred while fetching profile:", err.message);
        setDrop(null);
      }
    };    

    getProfile();
  }, []);

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


  function handleLogout() {
    localStorage.clear();
    navigate('/')
  }
  console.log(user)

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
                <a
                  href="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
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

            {token && token.length > 18 ? (
              <div className="lgd-in-dropdown">
                <img src={drop == null ? noprofile : drop.image} alt="" />
                <p className="name_p" onClick={()=>{setDown(!down)}}>{user.username}<FaAngleDown /></p>
                {down && (<div className="drop_div">

                  {drop !== null ? <a href="/profile">Profile</a> : null}
                  <p onClick={handleLogout}>Logout</p>
                </div> )}
              </div>
            ) : (
              <a className="lgn" href="/auth">
                Login
              </a>
            )}

            <div className="burger-menu" onClick={handleClick}>
              {click ? <FaTimes size={40} /> : <FaBars size={40} />}
            </div>
            <div className={click ? "nav-menu active" : "nav-menu"}>
              <a href="/">Home</a>
              {/* <button onClick={() => navigate("/single", { state: { id: user._id } })}>Details</button> */}
              <a href="/ourteam">Our team</a>
              <a href="/community">Community</a>
              <a href="/aboutme">About me</a>
              <a href="/contactus">Contact Us</a>
              <a href="/auth">Login</a>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;

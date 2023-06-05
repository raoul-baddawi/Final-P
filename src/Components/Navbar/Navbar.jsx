import "./navbar.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink as Lol } from 'react-router-hash-link';

import logo from "../../Assets/Slice 1.png";
import axios from "axios";
import noprofile from "../../Assets/noimage.png";
const Navbar = () => {


  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [color, setColor] = useState(false);
  const [drop, setDrop] = useState([]);
  const [down, setDown] = useState(false);

  // console.log(drop)
  useEffect(() => {
    setTimeout(() => {
      const getProfile = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
          const res = await axios.get(
            `https://appreciate-b.onrender.com/profile/${user._id}`
          );
          if (res.data.message === "No") {
            setDrop(null);
          } else {
            setDrop(res.data);
          }
        } catch (err) {
          console.log("Error occurred while fetching profile:", err.message);
          setDrop(null);
        }
      };

      getProfile();

    }, 3000);
   

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
    navigate("/");
  }
  // console.log(drop);

  return (
    <>
      {location.pathname === "/profile" ||
      location.pathname === "/dashboard" ? null : (
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
                      offset={-80}
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
                {/* <Link
                  activeClass="active"
                  to="footer"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  tabIndex={0}
                >
                  Contact me
                </Link> */}
                <Lol smooth to="/#footer">
                  Contact Me
                </Lol>
              </li>
            </ul>

            {token && token.length > 18 ? (
              <div className="lgd-in-dropdown">
                <img src={drop === null ? noprofile : drop.image} alt="" />
                <p
                  className="name_p"
                  onClick={() => {
                    setDown(!down);
                  }}
                >
                  {user.username}
                  <FaAngleDown />
                </p>
                {down && (
                  <div className="drop_div">
                    {drop !== null &&
                    user.role !== "superAdmin" &&
                    user.role !== "user" ? (
                      <a href="/profile" id="for_backgound">
                        <i className="fa-solid fa-user"></i> Profile
                      </a>
                    ) : null}
                    {user.role === "superAdmin" ? (
                      <a href="/dashboard" id="for_backgound">
                        <i className="fa-sharp fa-solid fa-gears"></i> Dashboard
                      </a>
                    ) : null}
                    <p onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </p>
                  </div>
                )}
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
              <div className="nav-menu_head">
                {token && token.length > 18 ? (
                  <div className="drp_dwn_phone">
                    <div className="name_img-wrp">
                      <img src={drop == null ? noprofile : drop.image} alt="" />
                      <p className="user_phn_name">{user.username}</p>
                    </div>
                    {drop !== null ? (
                      <a href="/profile" id="for_backgound">
                        <i className="fa-solid fa-user"></i> Profile
                      </a>
                    ) : null}
                    <p onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </p>
                  </div>
                ) : (
                  <a className="lgn" href="/auth">
                    <i className="fa-regular fa-person-to-portal"></i>
                    Login
                  </a>
                )}
              </div>
              <div className="nav-menu_body">
                <a href="/">
                  <i className="fa-solid fa-house-chimney-user"></i> Home
                </a>
                {/* <button onClick={() => navigate("/single", { state: { id: user._id } })}>Profile</button> */}
                <a href="/ourteam">
                  <i className="fa-solid fa-people-group"></i> Our team
                </a>
                <a href="/community">
                  <i className="fa-sharp fa-solid fa-comments"></i> Community
                </a>
                <a href="/aboutme">
                  <i className="fa-solid fa-address-card"></i> About me
                </a>
                {/* <Link
                  activeClass="active"
                  to="footer"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  tabIndex={0}
                  onClick={() => {
                    setClick(false);
                  }}
                >
                  <i className="fa-solid fa-envelope"></i> Contact me
                </Link> */}
                <Lol to="/#footer">
                  Contact Me
                </Lol>
                {/* <a href="/contactus">
             
                Contact me</a> */}
              </div>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;

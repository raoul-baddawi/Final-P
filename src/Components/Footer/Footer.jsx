import React from "react";
import "./footer.css";
import { Element } from "react-scroll";
import ContactMe from "../Contact/ContactMe";

const Footer = () => {
  return (
    <Element name="footer" className="the_end">
      <div id="footer">
      <h1>You have reached the end!</h1>
        <div className="all_footer-wrap">
          <ContactMe />
          <div className="sociallinks_mainer">
            <h1>Social Links</h1>
            <ul className="social_ul">
              <a href="https://github.com/raoul-baddawi" target="_blank" rel="noopener noreferrer">
                <li style={{ "--j": 5, "--clr": "#ffffff" }}>
                  <p>
                    <span>
                      <i className="fa-brands fa-github"></i>
                    </span>
                    github
                  </p>
                </li>
              </a>
              <a href="https://www.linkedin.com/in/raoul-baddawi/" target="_blank" rel="noopener noreferrer">
                <li style={{ "--j": 4, "--clr": "#1da1f2" }}>
                  <p>
                    <span>
                      <i className="fa-brands fa-linkedin"></i>
                    </span>
                    linkedin
                  </p>
                </li>
              </a>{" "}
              <a href="https://www.facebook.com/roro.rorocr.7" target="_blank" rel="noopener noreferrer">
                <li style={{ "--j": 3, "--clr": "#1877f2" }}>
                  <p>
                    <span>
                      <i className="fa-brands fa-facebook-f"></i>
                    </span>
                    facebook
                  </p>
                </li>
              </a>
              <a href="https://www.instagram.com/raoul_baddawi/" target="_blank" rel="noopener noreferrer">
                <li style={{ "--j": 2, "--clr": "#c32aa3" }}>
                  <p>
                    <span>
                      <i className="fa-brands fa-instagram"></i>
                    </span>
                    instagram
                  </p>
                </li>
              </a>
            </ul>
          </div>

          <div className="social_wrp4header">
            <h1>Lets connect</h1>
            <div className="social_phone-links">
              <div className="link-child" style={{ "--clr": "#1da1f2" }}>
                <i className="fa-brands fa-linkedin"></i>
              </div>
              <div className="link-child" style={{ "--clr": "#ffffff" }}>
                <i className="fa-brands fa-github"></i>
              </div>
              <div className="link-child" style={{ "--clr": "#1877f2" }}>
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <div className="link-child" style={{ "--clr": "#cc39a4" }}>
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
          </div>

          <div className="pages-links_container">
            <h1>Check out this website</h1>
            <a href="/ourteam">Our Team</a>
            <a href="/community">Community</a>
            <a href="/about">About us</a>
          </div>
        </div>
        <p className="copy_right">Copyright © 2023 Raoul Baddawi | All rights reserved</p>
      </div>
    </Element>
  );
};

export default Footer;

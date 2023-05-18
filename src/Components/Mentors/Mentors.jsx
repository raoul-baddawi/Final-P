import React, { useEffect, useState } from "react";
import "./mentors.css";
import { Element } from "react-scroll";
import lol from "../../Assets/raoul(1).jpeg";
import axios from "axios";

function Mentors() {
  const [mentor, setMentor] = useState([]);
  const [activeItem, setActiveItem] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8800/profile")
      .then((res) => {
        const mentorData = res.data.filter((profile) => profile.user_type === 'mentor');
        setMentor(mentorData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <Element name="mentors">
      <section id="mentors">
        <h1>Codi Team</h1>
        <div className="mentors_left">
          <div className="container">
            <div className="icon">
              {mentor &&
                mentor.map((item, index) => (
                  <>
                  <React.Fragment key={index}>
                    <div
                      className={`imgBx ${
                        activeItem === index ? "active" : ""
                      }`}
                      style={{ "--i": index + 1 }}
                      onClick={() => handleItemClick(index)}
                    >
                      <img src={lol} alt="lol" />
                    </div>
                    
                  </React.Fragment>
                  <div
                      className={`contentBx ${
                        activeItem === index ? "activated" : ""
                      }`}
                      data-id={`content${index + 1}`}
                    >
                      <div className="card">
                        <div className="imgBox">
                          <img src={lol} alt="hiii" />
                        </div>
                        <div className="textBx">
                          <h2>
                            {item.user_type}<br></br>
                          </h2>
                          <h3>
                            {item.name}<br></br>
                          </h3>
                          <ul className="sci">
                            <li>
                              <a href="/lol">
                                <i className="fa-brands fa-facebook-f"></i>
                              </a>
                            </li>
                            <li>
                              <a href="/lol">
                              <i className="fa-brands fa-github"></i>
                              </a>
                            </li>
                            <li>
                              <a href="/lol">
                                <i className="fa-brands fa-instagram"></i>
                              </a>
                            </li>
                            <li>
                              <a href="/lol">
                                <i className="fa-brands fa-linkedin-in"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`description ${
                        activeItem === index ? "desc_activated" : ""
                      }`}
                    >
                      <h1>"{item.description}"</h1>
                      <p>{item.name}</p>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
}

export default Mentors;

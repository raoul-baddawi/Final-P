import React, { useEffect, useState } from "react";
import "./mentors.css";
import { Element } from "react-scroll";
import noimage from '../../Assets/noimage.png'
import axios from "axios";

function Mentors() {
  const [mentor, setMentor] = useState([]);
  const [activeItem, setActiveItem] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      axios
      .get("https://appreciate-b.onrender.com/profile")
      .then((res) => {
        const mentorData = res.data.filter(
          (profile) => profile.user_type === "mentor"
        );
        setMentor(mentorData);
      })
      .catch((err) => console.log(err));
    }, 3000);
  }, []);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  // console.log(mentor);
  return (
    <Element name="mentors" className="fix-top">
      <section id="mentors">
        <h1>Codi Team</h1>
        <div className="mentors_left">
          <div className="container">
            <div className="icon">
              {mentor &&
                mentor.map((item, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`imgBx ${
                        activeItem === index ? "active" : ""
                      }`}
                      style={{ "--i": index + 1 }}
                      onClick={() => handleItemClick(index)}
                    >
                      <img src={item.image || noimage} alt={`${item.name}'s pic`} />
                    </div>

                    <div
                      className={`contentBx ${
                        activeItem === index ? "activated" : ""
                      }`}
                      data-id={`content${index + 1}`}
                    >
                      <div className="card">
                        <div className="imgBox">
                          <img src={item.image || noimage} alt={`${item.name}'s pic`} />
                        </div>
                        <div className="textBx">
                          <h2>
                            {item.user_type}
                            <br></br>
                          </h2>
                          <h3>
                            {item.name}
                            <br></br>
                          </h3>
                          <ul className="sci">
                            <li>
                              <a href={item.facebook} target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-facebook-f"></i>
                              </a>
                            </li>
                            <li>
                              <a href={item.github} target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-github"></i>
                              </a>
                            </li>
                            <li>
                              <a href={item.instagram} target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-instagram"></i>
                              </a>
                            </li>
                            <li>
                              <a href={item.linkedin} target="_blank" rel="noopener noreferrer">
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
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
}

export default Mentors;

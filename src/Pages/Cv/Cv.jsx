import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import noprofile from "../../Assets/noimage.png";
import fb from "../../Assets/facebook.png";
import ig from "../../Assets/instagram.png";
import lnkin from "../../Assets/linkedin.png";
import gh from "../../Assets/github.png";
import "./cv.css";
const Cv = () => {
  let navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [profile, setProfile] = useState([]);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const location = useLocation();

   useEffect(() => {
    const getItem = async () => {
      try {
        if (location.state && location.state.id) {
          const prData = await axios.get(
            `http://localhost:8800/profile/${location.state.id}`
          );
          const cvData = await axios.get(
            `http://localhost:8800/cv/${location.state.id}`
          );
          const exData = await axios.get(
            `http://localhost:8800/experience/${location.state.id}`
          );
          const edData = await axios.get(
            `http://localhost:8800/education/${location.state.id}`
          );
          setProfile(prData.data)
          setCv(cvData.data);
          setExperiences(exData.data)
          setEducations(edData.data);
        } else {
          // Redirect to 404 page or display an error message
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, [location.state, navigate]);

  console.log(profile)
  if (!cv) {
    return <Loader />;
  }
  return (
    <div className="cv-mainer">
      <div id="cv_header">
        <p>{cv.name}</p>
        <ul className="list-1">
          <li className="left facebook">
            <a href={profile.facebook}>
              <img src={fb} alt="fb" />
            </a>
          </li>
          <li className="left instagram">
            <a href={profile.instagram}>
              <img src={ig} alt="insta" />
            </a>
          </li>
          <li className="left linkedin">
            <a href={profile.linkedin}>
              <img src={lnkin} alt="in" />
            </a>
          </li>
          <li className="left github">
            <a href={profile.github}>
              <img src={gh} alt="gh" />
            </a>
          </li>
        </ul>
      </div>
      <div id="wrapper">
        <div id="intro">
          <img
            src={profile ? profile.image : noprofile}
            alt="good lookin guy"
            width="100px"
            height="100px"
          />
          <div className="two">
            <h1 className="Rb">{cv.name}</h1>
            <p className="RBP">{cv.position}</p>
            <div className="btn_cvhead">
              <a href="/" className="btn-1">
                Download CV
              </a>
              <a href="#break" className="btn-2">
                Hire Me
              </a>
            </div>
          </div>
        </div>
        <div id="About">
          <div>
            <h2>About Me</h2>
            <p>
              {cv.about_me}
            </p>
          </div>
          <ul>
            <section>
              <li>Age:</li>
              <li>Email:</li>
              <li>Phone:</li>
            </section>
            <section>
              <li>{cv.age}</li>
              <li>{cv.email}</li>
              <li>{cv.phone}</li>
            </section>
          </ul>
        </div>
        
        <hr className="hr2"></hr>
        <div id="workxp">
          <h2>Education</h2>
          {educations && educations.map((education, index) => (
              <div className="sec-1 works" key={index}>
              <p>
                <span>{education.title}</span> | {education.start} - {education.end}
              </p>
              <p>
              {education.description}
              </p>
            </div>
            ))}
        </div>

        <hr className="break"></hr>

        <div id="Hobbies">
          <h2>Work Experiences</h2>
          {experiences && experiences.map((experience, index) => (
              <div className="hobs" key={index}>
              <p>
                <span>{experience.title}</span> | {experience.start} - {experience.end}
              </p>
              <p>
              {experience.description}
              </p>
            </div>
            ))}
        </div>
      </div>
      <footer id="footerr">
        <h2>Raoul Baddawi</h2>
        <ul className="list-1" id="footerul">
          <li className="facebook">
            <a href="https://www.facebook.com/roro.rorocr.7">
              <img src={fb} alt="fb" />
            </a>
          </li>
          <li className="instagram">
            <a href="https://www.instagram.com/raoul_baddawi/">
              <img src={ig} alt="insta" />
            </a>
          </li>
          <li className="linkedin">
            <a href="https://www.linkedin.com/in/raoul-baddawi/">
              <img src={lnkin} alt="in" />
            </a>
          </li>
          <li className="github">
            <a href="https://github.com/raoul-baddawi">
              <img src={gh} alt="gh" />
            </a>
          </li>
        </ul>
        <p>You've reached the end!</p>
      </footer>
    </div>
  );
};

export default Cv;

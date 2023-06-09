import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import noprofile from "../../Assets/noimage.png";
import fb from "../../Assets/facebook.png";
import ig from "../../Assets/instagram.png";
import lnkin from "../../Assets/linkedin.png";
import gh from "../../Assets/github.png";
import "./cv.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Cv = () => {
  let params = useParams();
  let id = params.id;
  let navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [profile, setProfile] = useState([]);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  // const location = useLocation();
  const captureRef = useRef(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        if (id) {
          const prData = await axios.get(
            `https://appreciate-b.onrender.com/profile/${id}`
          );
          const cvData = await axios.get(
            `https://appreciate-b.onrender.com/cv/${id}`
          );
          const exData = await axios.get(
            `https://appreciate-b.onrender.com/experience/${id}`
          );
          const edData = await axios.get(
            `https://appreciate-b.onrender.com/education/${id}`
          );
          setProfile(prData.data);
          setCv(cvData.data);
          setExperiences(exData.data);
          setEducations(edData.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, [navigate, id]);

  const downloadPDF = () => {
    const capture = captureRef.current;
    const contentHeight = capture.offsetHeight;
    const contentWidth = capture.offsetWidth;

    html2canvas(capture, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", [contentWidth, contentHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, contentWidth, contentHeight);
      pdf.save("cv.pdf");
    });
  };

  if (!cv) {
    return <Loader />;
  }
  return (
    <>
     <button className="Btn-cv" onClick={()=>{navigate(-1)}}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="text">Back</div>
            </button>
    <div className="cv-mainer" ref={captureRef}>
      <div id="cv_header">
        <p>{cv.name.length > 1 ? cv.name : "User Name"}</p>
        <ul className="list-1">
          <li className="left facebook">
            <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
              <img src={fb} alt="fb" />
            </a>
          </li>
          <li className="left instagram">
            <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
              <img src={ig} alt="insta" />
            </a>
          </li>
          <li className="left linkedin">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <img src={lnkin} alt="in" />
            </a>
          </li>
          <li className="left github">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <img src={gh} alt="gh" />
            </a>
          </li>
        </ul>
      </div>
      <div id="wrapper">
        <div id="intro">
          <img
            src={cv.image || noprofile}
            alt="Good lookin Person"
            width="100px"
            height="100px"
          />
          <div className="two">
            <h1 className="Rb">{cv.name.length > 1 ? cv.name : "Cv data is not filled yet by the owner"}</h1>
            <p className="RBP">{cv.position}</p>
            <div className="btn_cvhead">
              <button className="btn-1" onClick={downloadPDF}>
                Download CV
              </button>
              <a href={`mailto:${cv.email}`} className="btn-2">
                Hire Me
              </a>
            </div>
          </div>
        </div>
        <div id="About">
          <div>
            <h2>About Me</h2>
            <p>{cv.about_me}</p>
          </div>
          <ul>
            <section>
              <li>Age:<span> {cv.age}</span></li>
              <li>Email:<span> {cv.email}</span></li>
              <li>Phone:<span> {cv.phone}</span></li>
            </section>
           
          </ul>
        </div>

        <hr className="hr2"></hr>
        <div id="workxp">
          <h2>Education</h2>
          {educations &&
            educations.map((education, index) => (
              <div className="sec-1 works" key={index}>
                <p>
                  <span>{education.title}</span> | {education.start} -{" "}
                  {education.end}
                </p>
                <p>{education.description}</p>
              </div>
            ))}
        </div>

        <hr className="break"></hr>

        <div id="Hobbies">
          <h2>Work Experiences</h2>
          {experiences &&
            experiences.map((experience, index) => (
              <div className="hobs" key={index}>
                <p>
                  <span>{experience.title}</span> | {experience.start} -{" "}
                  {experience.end}
                </p>
                <p>{experience.description}</p>
              </div>
            ))}
        </div>
      </div>
      <footer id="footerr">
        <h2>{cv.name}</h2>
        <ul className="list-1" id="footerul">
          <li className="facebook">
            <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
              <img src={fb} alt="fb" />
            </a>
          </li>
          <li className="instagram">
            <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
              <img src={ig} alt="insta" />
            </a>
          </li>
          <li className="linkedin">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <img src={lnkin} alt="in" />
            </a>
          </li>
          <li className="github">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <img src={gh} alt="gh" />
            </a>
          </li>
        </ul>
        <p>You've reached the end!</p>
      </footer>
    </div>
    </>
  );
};

export default Cv;

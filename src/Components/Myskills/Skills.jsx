import React from "react";
import { Element } from "react-scroll";

import "./skills.css";

const Skills = () => {
  return (
    <Element name="skills" className="skills_wrapper">
      <h1>My Skills</h1>
      <section id="skills">
        <div className="skill">
          <div className="skill_header">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.49166 3.1665H31.5083C32.4583 3.1665 33.25 3.95817 33.0917 4.90817L30.2417 30.5582C30.2417 31.1915 29.7667 31.6665 29.1333 31.9832L19.475 34.6748C19.1583 34.8332 18.8417 34.8332 18.6833 34.6748L9.02499 31.9832C8.39166 31.8248 7.91666 31.3498 7.91666 30.5582L4.90833 4.90817C4.90833 3.95817 5.54166 3.1665 6.49166 3.1665Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.65 10.7666H12.35L12.9833 17.7333H25.0166L24.0666 25.6499L18.6833 27.2333L12.9833 25.6499V22.4833"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>Front End</h2>
          </div>
          <div className="skill_body">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>Redux</span>
            <span>TailwindCSS</span>
            <span>Bootstrap</span>
          </div>
        </div>
        <div className="skill">
          <div className="skill_header">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4583 30.0358H12.6667C6.33333 30.0358 3.16667 28.4525 3.16667 20.5358V12.6191C3.16667 6.28581 6.33333 3.11914 12.6667 3.11914H25.3333C31.6667 3.11914 34.8333 6.28581 34.8333 12.6191V20.5358C34.8333 26.8691 31.6667 30.0358 25.3333 30.0358H24.5417C24.0508 30.0358 23.5758 30.2733 23.275 30.6691L20.9 33.8358C19.855 35.2291 18.145 35.2291 17.1 33.8358L14.725 30.6691C14.4717 30.3208 13.9017 30.0358 13.4583 30.0358Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.6667 13.7749L9.5 16.9416L12.6667 20.1083M25.3333 13.7749L28.5 16.9416L25.3333 20.1083M20.5833 13.2524L17.4167 20.6308"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>Back End</h2>
          </div>
          <div className="skill_body">
            <span>NodeJS</span>
            <span>ExpressJS</span>
            <span>MongoDB</span>
            <span>Mongoose</span>
            <span>PHP Laravel</span>
            <span>MySQL</span>
            <span>Restful APIs</span>
          </div>
        </div>
        <div className="skill">
          <div className="skill_header">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 15C22.5 14.337 22.7634 13.7011 23.2322 13.2322C23.7011 12.7634 24.337 12.5 25 12.5C25.663 12.5 26.2989 12.7634 26.7678 13.2322C27.2366 13.7011 27.5 14.337 27.5 15C27.5 15.663 27.2366 16.2989 26.7678 16.7678C26.2989 17.2366 25.663 17.5 25 17.5C24.337 17.5 23.7011 17.2366 23.2322 16.7678C22.7634 16.2989 22.5 15.663 22.5 15ZM22.5 15H7.5M7.5 15C7.5 15.663 7.23661 16.2989 6.76777 16.7678C6.29893 17.2366 5.66304 17.5 5 17.5C4.33696 17.5 3.70107 17.2366 3.23223 16.7678C2.76339 16.2989 2.5 15.663 2.5 15C2.5 14.337 2.76339 13.7011 3.23223 13.2322C3.70107 12.7634 4.33696 12.5 5 12.5C5.66304 12.5 6.29893 12.7634 6.76777 13.2322C7.23661 13.7011 7.5 14.337 7.5 15ZM25 7.5C25.663 7.5 26.2989 7.23661 26.7678 6.76777C27.2366 6.29893 27.5 5.66304 27.5 5C27.5 4.33696 27.2366 3.70107 26.7678 3.23223C26.2989 2.76339 25.663 2.5 25 2.5C24.337 2.5 23.7011 2.76339 23.2322 3.23223C22.7634 3.70107 22.5 4.33696 22.5 5C22.5 5.66304 22.7634 6.29893 23.2322 6.76777C23.7011 7.23661 24.337 7.5 25 7.5ZM25 27.5C25.663 27.5 26.2989 27.2366 26.7678 26.7678C27.2366 26.2989 27.5 25.663 27.5 25C27.5 24.337 27.2366 23.7011 26.7678 23.2322C26.2989 22.7634 25.663 22.5 25 22.5C24.337 22.5 23.7011 22.7634 23.2322 23.2322C22.7634 23.7011 22.5 24.337 22.5 25C22.5 25.663 22.7634 26.2989 23.2322 26.7678C23.7011 27.2366 24.337 27.5 25 27.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.5 5H17.5C15 5 13.75 6.25 13.75 8.75V21.25C13.75 23.75 15 25 17.5 25H22.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>Other</h2>
          </div>
          <div className="skill_body">
            <span>Git</span>
            <span>Github</span>
            <span>VS Code</span>
            <span>Trello</span>
            <span>Figma</span>
            <span>Miro.com</span>
            <span>Agile Methodology</span>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Skills;

import React, { useEffect, useState } from "react";
import { Element } from "react-scroll";
import './projects.css'
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    const getProjects = async () => {
        try{
        const projectsData = await axios.get('https://appreciate-b.onrender.com/project')
        setProjects(projectsData.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getProjects()
  },[])
  // console.log(projects)
  return (
    <Element name="projects" className="projects">
      <h1>My Projects</h1>
      <section id="projects">
        <div className="project_card">
          <div className="pr_card-head"></div>
          <div className="pr_card-body">
            <h2>Financo | Financial app</h2>
            <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim optio dolore numquam corrupti debitis porro dicta iste repudiandaet.</p>
            <p className="technologies"><span>Teck used: </span>Html, Css, React, Mongoose, mongodb, expressjs, javascript</p>
            <div className="demo_wrapper">
            <p className="technologies">Demo account:</p>
            <p><span>demo@gmail.com</span></p>
            <p><span>demo1234</span></p>
            </div>
            <div className="btns-project">
              <a href="/">See live</a>
              <a href="/">Repository</a>
            </div>
          </div>
        </div>
        <div className="project_card">
          <div className="pr_card-head"></div>
          <div className="pr_card-body">
            <h2>Financo | Financial app</h2>
            <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim optio dolore numquam corrupti debitis porro dicta iste repudiandaet.</p>
            <p className="technologies"><span>Teck used: </span>Html, Css, React, Mongoose, mongodb, expressjs, javascript</p>
            <div className="demo_wrapper">
            <p className="technologies">Demo account:</p>
            <p><span>demo@gmail.com</span></p>
            <p><span>demo1234</span></p>
            </div>
            <div className="btns-project">
              <a href="/">See live</a>
              <a href="/">Repository</a>
            </div>
          </div>
        </div>
        <div className="project_card">
          <div className="pr_card-head"></div>
          <div className="pr_card-body">
            <h2>Financo | Financial app</h2>
            <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim optio dolore numquam corrupti debitis porro dicta iste repudiandaet.</p>
            <p className="technologies"><span>Teck used: </span>Html, Css, React, Mongoose, mongodb, expressjs, javascript</p>
            <div className="demo_wrapper">
            <p className="technologies">Demo account:</p>
            <p><span>demo@gmail.com</span></p>
            <p><span>demo1234</span></p>
            </div>
            <div className="btns-project">
              <a href="/">See live</a>
              <a href="/">Repository</a>
            </div>
          </div>
        </div>
        <div className="project_card">
          <div className="pr_card-head"></div>
          <div className="pr_card-body">
            <h2>Financo | Financial app</h2>
            <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim optio dolore numquam corrupti debitis porro dicta iste repudiandaet.</p>
            <p className="technologies"><span>Teck used: </span>Html, Css, React, Mongoose, mongodb, expressjs, javascript</p>
            <div className="demo_wrapper">
            <p className="technologies">Demo account:</p>
            <p><span>demo@gmail.com</span></p>
            <p><span>demo1234</span></p>
            </div>
            <div className="btns-project">
              <a href="/">See live</a>
              <a href="/">Repository</a>
            </div>
          </div>
        </div>
        
      </section>
    </Element>
  );
};

export default Projects;

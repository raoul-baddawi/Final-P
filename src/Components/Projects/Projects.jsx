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
  return (
    <Element name="projects" className="projects">
      <h1>My Projects</h1>
      <section id="projects">
        {projects && projects.map((project, index)=>(
           <div className="project_card">
           <div className="pr_card-head">
            <img src={project.image} alt={project.title} />
           </div>
           <div className="pr_card-body">
             <h2>{project.title} | {project.subtitle}</h2>
             <p>{project.desc}</p>
             <p className="technologies"><span>Teck used: </span>{project.technologies}</p>
             <div className="demo_wrapper">
             <p className="technologies">Demo account:</p>
             <p><span>{project.email}</span></p>
             <p><span>{project.password}</span></p>
             </div>
             <div className="btns-project">
               <a href={project.website_link}>See live</a>
               <a href={project.repository}>Repository</a>
             </div>
           </div>
         </div>
        ))}      
      </section>
    </Element>
  );
};

export default Projects;

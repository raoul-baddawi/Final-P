import React, { useEffect, useState } from "react";
import "./projectsdash.css";
import { Element } from "react-scroll";
import axios from "axios";

import noimage from "../../Assets/raoul(3).jpeg";
const DashProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState({ image: "" });
  const [showProject, setShowProject] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    desc: "",
    technologies: "",
    email: "",
    password: "",
    website_link: "",
    repository: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // console.log(projects)
  useEffect(() => {
    const fetchDashboardProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/project`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardProjects();
  }, []);

  const handleSubmit = async (event) => {
    console.log("clicked");
    event.preventDefault();

    const form = new FormData();
    form.append("image", selectedImage.image);
    form.append("title", formData.title);
    form.append("subtitle", formData.subtitle);
    form.append("desc", formData.desc);
    form.append("technologies", formData.technologies);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("website_link", formData.website_link);
    form.append("repository", formData.repository);
    try {
     await axios.post("http://localhost:8800/project", form).then((res) => {
        if(res.status === 201){
          window.location.reload()
        }else{
          console.log(res.status)
        }
      });
      
    } catch (error) {
      console.error(error); // Handle the error
    }
  };


  const handleImageChange = (e) => {
    const value = e.target.files[0];
    setSelectedImage({ [e.target.name]: value });
  };


  const handleDeleteProject = async(id)=>{
    try {
       await axios.delete(`http://localhost:8800/project/${id}`).then((res) => {
      });
      
    } catch (error) {
      console.error(error); // Handle the error
    }
  }

  // console.log(projects)
  
  return (
    <Element name="project" className="members_main">
      <h1>
        Projects
        <button
          className="add_dash"
          onClick={() => {
            setShowProject(true);
          }}
        >
          <i className="fa-sharp fa-regular fa-plus"></i>
          Add
        </button>
      </h1>
      <div id="project" className="projects-dash">
        <section id="msgs-incomes">
          <div className={showProject ? "animated_add showw" : "hide"}>
            <form className="animated_form" onSubmit={handleSubmit}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <label htmlFor="subtitle">Subtitle:</label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
              />
              <label htmlFor="desc">Description:</label>
              <input
                type="text"
                name="desc"
                id="desc"
                value={formData.desc}
                onChange={handleInputChange}
              />
              <label htmlFor="technologies">technologies:</label>
              <input
                type="text"
                name="technologies"
                id="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email2"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="password2">Password:</label>
              <input
                type="text"
                name="password"
                id="password2"
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="website_link">Website link:</label>
              <input
                type="text"
                name="website_link"
                id="website_link"
                value={formData.website_link}
                onChange={handleInputChange}
              />
              <label htmlFor="repository">Repository:</label>
              <input
                type="text"
                name="repository"
                id="repository"
                value={formData.repository}
                onChange={handleInputChange}
              />
              <input
                type="file"
                onChange={handleImageChange}
                accept="uploads/*"
                name="image"
                className="img_input-dsh"
              />
              {/* <p>{message}</p> */}
              <div className="edc-btn-main">
                <button type="submit" className="for_admin-btns">
                  <i className="fa-solid fa-check"></i>
                </button>
                <button
                  className="for_admin-btns"
                  type="button"
                  onClick={() => {
                    setShowProject(false);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="all_messages_wrapper">
            {projects &&
              projects.map((project, index) => (
                <div className="dsh-pr-card" key={index}>
                  <div className="head_dash-crd">
                    <img src={project.image || noimage} alt="hello" />
                  </div>
                  <div className="body_dash-crd">
                    <h2>
                      {project.title} | {project.subtitle}{" "}
                    </h2>
                    <p>{project.desc}</p>
                    <p className="technologies">
                      <span>Teck used: </span>
                      {project.technologies}
                    </p>
                    <div className="demo_wrapper">
                      <p className="technologies">Demo account:</p>
                      <p>
                        <span>{project.email}</span>
                      </p>
                      <p>
                        <span>{project.password}</span>
                      </p>
                    </div>
                    <div className="btns-project">
                      <a href={project.website_link}>See live</a>
                      <a href={project.repository}>Repository</a>
                    </div>
                    <button
                      className="prjct_edit-trg"
                      onClick={()=>{handleDeleteProject(project._id)}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              
          </div>
        </section>
      </div>
    </Element>
  );
};

export default DashProject;

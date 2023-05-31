import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import './experience.css'
// import { Link } from "react-scroll";
import axios from "axios";

const Experience = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState('')
  const [showExperience, setShowExperience] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [editedField, setEditedField] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [experienceData, setExperienceData] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
  });

  const handleAddExperience = () => {
    setShowExperience(true);
  };

  const handleExChange = (e) => {
    const { name, value } = e.target;
    setExperienceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleExSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8800/experience/${user._id}`,
        experienceData
      );
      setShowExperience(false);
      window.location.reload();
    } catch (error) {  
      setMessage(error.response.data.message)
    }
  };


  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const exresponse = await axios.get(`http://localhost:8800/experience/`);
        setExperiences(exresponse.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchExperienceData();
  }, []);


  const handleEditField = (field, value) => {
    setEditedField(field);
    setEditedValue(value);
  };

  const updateExperienceField = async (experienceId, field) => {
    try {
      const updatedField = { [field]: editedValue };
      await axios.patch(
        `http://localhost:8800/experience/${experienceId}`,
        updatedField
      );

      setEditedField(null);
      setEditedValue("");
      window.location.reload(); 
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExperience = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/experience/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Element name="experience" className="exp_main">
       <section id="experience">
       <div className="edc_head">
        <h2>Experience</h2>
        <button onClick={handleAddExperience}>
          <i className="fa-sharp fa-regular fa-plus"></i>
          Add
        </button>
      </div>
      <div className={showExperience ? "animated_add show" : "hide"}>
        <form onSubmit={handleExSubmit} className="animated_form">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={experienceData.title}
            onChange={handleExChange}
            placeholder="Enter title"
            required
          />
          <label>Start:</label>
          <input
            type="text"
            name="start"
            value={experienceData.start}
            onChange={handleExChange}
            placeholder="Enter start date"
            required
          />
          <label>End:</label>
          <input
            type="text"
            name="end"
            value={experienceData.end}
            onChange={handleExChange}
            placeholder="Enter end date"
            required
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={experienceData.description}
            onChange={handleExChange}
            placeholder="Enter description"
            required
          />
          <p>{message}</p>
          <div className="edc-btn-main">
           
            <button type="submit">
              <i className="fa-solid fa-check"></i>
            </button>
            <button
              type="button"
              onClick={() => {
                setShowExperience(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </form>
      </div>
      {experiences &&
                experiences.map((experience, index) => (
                  <div key={index} className="education_element">
                    <label>
                      <h3>Title:</h3>
                      {editedField === `title_${experience._id}` ? (
                        <div className="rendered-wrapper">
                          <input
                            type="text"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                          />
                         <div className="button">
                          <button onClick={() =>
                                    updateExperienceField(experience._id, "title")
                                  }>
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button onClick={()=>{window.location.reload()}}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                        </div>
                      ) : (
                        <div className="p">
                        <p className="edc-title">
                          {experience.title}
                          </p>

                          <button
                            onClick={() =>
                              handleEditField(
                                `title_${experience._id}`,
                                experience.title
                              )
                            }
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                          </div>
                      )}
                    </label>
                    <label>
                      <h3>Start date:</h3>
                      {editedField === `start_${experience._id}` ? (
                        <div className="rendered-wrapper">
                          <input
                            type="text"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                          />
                         <div className="button">
                          <button onClick={() =>
                                    updateExperienceField(experience._id, "start")
                                  }>
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button onClick={()=>{window.location.reload()}}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                        </div>
                      ) : (
                        <div className="p">
                        <p className="edc-title">
                          {experience.start}
                          </p>
                          <button
                            onClick={() =>
                              handleEditField(
                                `start_${experience._id}`,
                                experience.start
                              )
                            }
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                          </div>
                      )}
                    </label>
                    <label>
                      <h3>End date:</h3>
                      {editedField === `end_${experience._id}` ? (
                        <div className="rendered-wrapper">
                          <input
                            type="text"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                          />
                         <div className="button">
                          <button onClick={() =>
                                    updateExperienceField(experience._id, "end")
                                  }>
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button onClick={()=>{window.location.reload()}}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                        </div>
                      ) : (
                        <div className="p">

                        <p className="edc-title">
                          {experience.end}
                          </p>
                          <button
                            onClick={() =>
                              handleEditField(
                                `end_${experience._id}`,
                                experience.end
                              )
                            }
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                        </div>
                      )}
                    </label>
                    <label>
                      <h3>Description:</h3>
                      {editedField === `description_${experience._id}` ? (
                        <div className="rendered-wrapper">
                          <input
                            type="text"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                          />
                          <div className="button">
                          <button onClick={() =>
                                    updateExperienceField(experience._id, "description")
                                  }>
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button onClick={()=>{window.location.reload()}}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                        </div>
                      ) : (
                        <div className="p">
                        <p className="edc-title">
                          {experience.description}
                        </p>
                        <button
                            onClick={() =>
                              handleEditField(
                                `description_${experience._id}`,
                                experience.description
                              )
                            }
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                        </div>
                      )}
                    </label>
                    <button
                      onClick={() => deleteExperience(experience._id)}
                      className="edc-delete"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                      Delete
                    </button>
                  </div>
                ))}
       </section>
    </Element>
  )
}

export default Experience

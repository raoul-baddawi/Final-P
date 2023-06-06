import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import '../../Pages/Profile/profile.css'
import './education.css'
import axios from "axios";

const Education = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState('')
  const [showEducation, setShowEducation] = useState(false);
  const [educations, setEducations] = useState([]);
  const [editedField, setEditedField] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [educationData, setEducationData] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
  });

  const handleAddEducation = () => {
    setShowEducation(true);
  };

  const handleEdChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleEdSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `https://appreciate-b.onrender.com/education/${user._id}`,
        educationData
      );
      setShowEducation(false);
      window.location.reload();
    } catch (error) {  
      setMessage(error.response.data.message)
    }
  };


  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const edresponse = await axios.get(`https://appreciate-b.onrender.com/education/${user._id}`);
        setEducations(edresponse.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchEducationData();
  }, [user._id]);


  const handleEditField = (field, value) => {
    setEditedField(field);
    setEditedValue(value);
  };

  const updateEducationField = async (educationId, field) => {
    try {
      const updatedField = { [field]: editedValue };
      await axios.patch(
        `https://appreciate-b.onrender.com/education/${educationId}`,
        updatedField
      );

      setEditedField(null);
      setEditedValue("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEducation = async (id) => {
    try {
      await axios.delete(`https://appreciate-b.onrender.com/education/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Element name="education" className="exp_main">
       <section id="education">
       <div className="edc_head">
        <h2>Education</h2>
        <button onClick={handleAddEducation}>
          <i className="fa-sharp fa-regular fa-plus"></i>
          Add
        </button>
      </div>
      <div className={showEducation ? "animated_add show" : "hide"}>
        <form onSubmit={handleEdSubmit} className="animated_form">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={educationData.title}
            onChange={handleEdChange}
            placeholder="Enter title"
            required
          />
          <label>Start:</label>
          <input
            type="text"
            name="start"
            value={educationData.start}
            onChange={handleEdChange}
            placeholder="Enter start date"
            required
          />
          <label>End:</label>
          <input
            type="text"
            name="end"
            value={educationData.end}
            onChange={handleEdChange}
            placeholder="Enter end date"
            required
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={educationData.description}
            onChange={handleEdChange}
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
                setShowEducation(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </form>
      </div>
      {educations &&
                educations.map((education, index) => (
                  <div key={index} className="education_element">
                    <label>
                      <h3>Title:</h3>
                      {editedField === `title_${education._id}` ? (
                        <div className="rendered-wrapper">
                          <input
                            type="text"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                          />
                         <div className="button">
                          <button onClick={() =>
                                    updateEducationField(education._id, "title")
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
                          {education.title}
                          </p>

                          <button
                            onClick={() =>
                              handleEditField(
                                `title_${education._id}`,
                                education.title
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
                      {editedField === `start_${education._id}` ? (
                        <div className="rendered-wrapper">
                          <input
                            type="text"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                          />
                         <div className="button">
                          <button onClick={() =>
                                    updateEducationField(education._id, "start")
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
                          {education.start}
                          </p>
                          <button
                            onClick={() =>
                              handleEditField(
                                `start_${education._id}`,
                                education.start
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
                      {editedField === `end_${education._id}` ? (
                        <div className="rendered-wrapper">
                          <input
                            type="text"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                          />
                         <div className="button">
                          <button onClick={() =>
                                    updateEducationField(education._id, "end")
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
                          {education.end}
                          </p>
                          <button
                            onClick={() =>
                              handleEditField(
                                `end_${education._id}`,
                                education.end
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
                      {editedField === `description_${education._id}` ? (
                        <div className="rendered-wrapper">
                          <input
                            type="text"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                          />
                          <div className="button">
                          <button onClick={() =>
                                    updateEducationField(education._id, "description")
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
                          {education.description}
                        </p>
                        <button
                            onClick={() =>
                              handleEditField(
                                `description_${education._id}`,
                                education.description
                              )
                            }
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                        </div>
                      )}
                    </label>
                    <button
                      onClick={() => deleteEducation(education._id)}
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

export default Education
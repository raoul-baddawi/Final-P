import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { Link } from "react-scroll";
import "./profile.css";
import axios from "axios";
import Education from "../../Components/Education/Education";
import Experience from "../../Components/Experience/Experience";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(null);
  const [cv, setCv] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [isCvEditing, setIsCvEditing] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const presponse = await axios.get(
          `http://localhost:8800/profile/${user._id}`
        );
        const cresponse = await axios.get(
          `http://localhost:8800/cv/${user._id}`
        );
        setProfile(presponse.data);
        setCv(cresponse.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditClick = (field) => {
    setIsEditing((prevEditing) => ({ ...prevEditing, [field]: true }));
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
  };

  const handleSaveClick = async (field) => {
    try {
      const updatedField = { [field]: profile[field] };
      const response = await axios.patch(
        `http://localhost:8800/profile/${user._id}`,
        updatedField
      );
      setProfile(response.data);
      setIsEditing((prevEditing) => ({ ...prevEditing, [field]: false }));
    } catch (error) {
      console.error("Error updating profile field:", error);
    }
  };

  const handleCancelClick = (field) => {
    setIsEditing((prevEditing) => ({ ...prevEditing, [field]: false }));
    window.location.reload();
  };

  const handleEditCvClick = (field) => {
    setIsCvEditing((prevEditing) => ({ ...prevEditing, [field]: true }));
  };

  const handleInputCvChange = (e, field) => {
    const { value } = e.target;
    setCv((prevCv) => ({ ...prevCv, [field]: value }));
  };

  const handleSaveCvClick = async (field) => {
    try {
      const updatedField = { [field]: cv[field] };
      const response = await axios.patch(
        `http://localhost:8800/cv/${user._id}`,
        updatedField
      );
      setCv(response.data);
      setIsCvEditing((prevEditing) => ({ ...prevEditing, [field]: false }));
    } catch (error) {
      console.error("Error updating profile field:", error);
    }
  };

  const handleCancelCvClick = (field) => {
    setIsCvEditing((prevEditing) => ({ ...prevEditing, [field]: false }));
    window.location.reload();
  };

  function handleLogout() {
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className="profile_wrapper">
      <div className="nav_wrapper">
        <nav className={show ? "profile_nav visible" : "profile_nav hidden"}>
          <h1>
            Welcome<br></br>
            <i>{profile?.name}!</i>
          </h1>
          <ul>
            <div className="li_wrapper">
              <Link
                activeClass="active"
                to="profile"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                tabIndex={0}
                onClick={() => {
                  setShow(false);
                }}
              >
                <li>
                  <i className="fa-regular fa-user"></i>
                  Profile
                </li>
              </Link>

              <Link
                activeClass="active"
                to="cv"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                tabIndex={0}
                onClick={() => {
                  setShow(false);
                }}
              >
                <li>
                  <i className="fa-regular fa-file"></i>
                  Cv
                </li>
              </Link>
              <Link
                activeClass="active"
                to="education"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                tabIndex={0}
                onClick={() => {
                  setShow(false);
                }}
              >
                <li>
                <i className="fa-solid fa-graduation-cap"></i>
                  Education
                </li>
              </Link>
              <Link
                activeClass="active"
                to="experience"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                tabIndex={0}
                onClick={() => {
                  setShow(false);
                }}
              >
                <li>
                <i className="fa-solid fa-briefcase"></i>
                  Experience
                </li>
              </Link>
              <a href="/">
                <li>
                  <i className="fa-solid fa-house-chimney-user"></i>
                  Home Page
                </li>
              </a>
            </div>
            <button className="Btn" onClick={handleLogout}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="text">Logout</div>
            </button>
          </ul>
        </nav>
      </div>
      <div className="main">
        {profile && (
          <Element name="profile" className="profile_main">
            <h1>
              My profile
              <span
                onClick={() => {
                  setShow(!show);
                }}
              >
                {!show ? (
                  <i className="fa-solid fa-bars"></i>
                ) : (
                  <i className="fa-sharp fa-solid fa-xmark"></i>
                )}
              </span>
            </h1>
            <section id="profile">
              <div className="input_wrapper">
                <div className="field_header">
                  <label>Name: </label>
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleEditClick("name")}
                  ></i>
                </div>
                {isEditing.name ? (
                  <div>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleInputChange(e, "name")}
                    />
                    <div className="button">
                      <button onClick={() => handleSaveClick("name")}>
                        <i className="fa-solid fa-check"></i>
                      </button>

                      <button onClick={() => handleCancelClick("name")}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span>{profile.name}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="input_wrapper">
                <div className="field_header">
                  <label>Position: </label>
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleEditClick("position")}
                  ></i>
                </div>
                {isEditing.position ? (
                  <div>
                    <input
                      type="text"
                      value={profile.position}
                      onChange={(e) => handleInputChange(e, "position")}
                    />
                    <div className="button">
                      <button onClick={() => handleSaveClick("position")}>
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button onClick={() => handleCancelClick("position")}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span>{profile.position}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="input_wrapper">
                <div className="field_header">
                  <label>Description: </label>
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleEditClick("description")}
                  ></i>
                </div>
                {isEditing.description ? (
                  <div>
                    <input
                      type="text"
                      value={profile.description}
                      onChange={(e) => handleInputChange(e, "description")}
                    />
                    <div className="button">
                      <button onClick={() => handleSaveClick("description")}>
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button onClick={() => handleCancelClick("description")}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span>{profile.description}</span>
                    </p>
                  </div>
                )}
              </div>
              {profile.user_type === "dev"
              ?
              <div className="input_wrapper">
                <div className="field_header">
                  <label>Website Link: </label>
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleEditClick("website_link")}
                  ></i>
                </div>
                {isEditing.website_link ? (
                  <div>
                    <input
                      type="text"
                      value={profile.website_link}
                      onChange={(e) => handleInputChange(e, "website_link")}
                    />
                    <div className="button">
                      <button onClick={() => handleSaveClick("website_link")}>
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button onClick={() => handleCancelClick("website_link")}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span>{profile.website_link}</span>
                    </p>
                  </div>
                )}
              </div>
              : null
              }
              <div className="input_wrapper">
                <div className="field_header">
                  <label>Facebook: </label>
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleEditClick("facebook")}
                  ></i>
                </div>
                {isEditing.facebook ? (
                  <div>
                    <input
                      type="text"
                      value={profile.facebook}
                      onChange={(e) => handleInputChange(e, "facebook")}
                    />
                    <div className="button">
                      <button onClick={() => handleSaveClick("facebook")}>
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button onClick={() => handleCancelClick("facebook")}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span>{profile.facebook}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="input_wrapper">
                <div className="field_header">
                  <label>Instagram: </label>
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleEditClick("instagram")}
                  ></i>
                </div>
                {isEditing.instagram ? (
                  <div>
                    <input
                      type="text"
                      value={profile.instagram}
                      onChange={(e) => handleInputChange(e, "instagram")}
                    />
                    <div className="button">
                      <button onClick={() => handleSaveClick("instagram")}>
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button onClick={() => handleCancelClick("instagram")}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span>{profile.instagram}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="input_wrapper">
                <div className="field_header">
                  <label>Github: </label>
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleEditClick("github")}
                  ></i>
                </div>
                {isEditing.github ? (
                  <div>
                    <input
                      type="text"
                      value={profile.github}
                      onChange={(e) => handleInputChange(e, "github")}
                    />
                    <div className="button">
                      <button onClick={() => handleSaveClick("github")}>
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button onClick={() => handleCancelClick("github")}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span>{profile.github}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="input_wrapper">
                <div className="field_header">
                  <label>LinkedIn: </label>
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleEditClick("linkedin")}
                  ></i>
                </div>
                {isEditing.linkedin ? (
                  <div>
                    <input
                      type="text"
                      value={profile.linkedin}
                      onChange={(e) => handleInputChange(e, "linkedin")}
                    />
                    <div className="button">
                      <button onClick={() => handleSaveClick("linkedin")}>
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button onClick={() => handleCancelClick("linkedin")}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span>{profile.linkedin}</span>
                    </p>
                  </div>
                )}
              </div>
            </section>
          </Element>
        )}

        <Element name="cv" className="cv_main">
          <h1 className="h1">My Cv</h1>
          <section id="cv">
            <div className="input_wrapper">
              <div className="field_header">
                <label>Name: </label>
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => handleEditCvClick("name")}
                ></i>
              </div>
              {isCvEditing.name ? (
                <div>
                  <input
                    type="text"
                    value={cv.name}
                    onChange={(e) => handleInputCvChange(e, "name")}
                  />
                  <div className="button">
                    <button onClick={() => handleSaveCvClick("name")}>
                      <i className="fa-solid fa-check"></i>
                    </button>

                    <button onClick={() => handleCancelCvClick("name")}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <span>{cv?.name}</span>
                  </p>
                </div>
              )}
            </div>
            <div className="input_wrapper">
              <div className="field_header">
                <label>Email address: </label>
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => handleEditCvClick("email")}
                ></i>
              </div>
              {isCvEditing.email ? (
                <div>
                  <input
                    type="text"
                    value={cv.email}
                    onChange={(e) => handleInputCvChange(e, "email")}
                  />
                  <div className="button">
                    <button onClick={() => handleSaveCvClick("email")}>
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button onClick={() => handleCancelCvClick("email")}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <span>{cv?.email}</span>
                  </p>
                </div>
              )}
            </div>
            <div className="input_wrapper">
              <div className="field_header">
                <label>About me: </label>
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => handleEditCvClick("about_me")}
                ></i>
              </div>
              {isCvEditing.about_me ? (
                <div>
                  <input
                    type="text"
                    value={cv.about_me}
                    onChange={(e) => handleInputCvChange(e, "about_me")}
                  />
                  <div className="button">
                    <button onClick={() => handleSaveCvClick("about_me")}>
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button onClick={() => handleCancelCvClick("about_me")}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <span>{cv?.about_me}</span>
                  </p>
                </div>
              )}
            </div>
            <div className="input_wrapper">
              <div className="field_header">
                <label>Phone Number: </label>
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => handleEditCvClick("phone")}
                ></i>
              </div>
              {isCvEditing.phone ? (
                <div>
                  <input
                    type="text"
                    value={cv.phone}
                    onChange={(e) => handleInputCvChange(e, "phone")}
                  />
                  <div className="button">
                    <button onClick={() => handleSaveCvClick("phone")}>
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button onClick={() => handleCancelCvClick("phone")}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <span>{cv?.phone}</span>
                  </p>
                </div>
              )}
            </div>
            <div className="input_wrapper">
              <div className="field_header">
                <label>Age: </label>
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => handleEditCvClick("age")}
                ></i>
              </div>
              {isCvEditing.age ? (
                <div>
                  <input
                    type="text"
                    value={cv.age}
                    onChange={(e) => handleInputCvChange(e, "age")}
                  />
                  <div className="button">
                    <button onClick={() => handleSaveCvClick("age")}>
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button onClick={() => handleCancelCvClick("age")}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <span>{cv?.age}</span>
                  </p>
                </div>
              )}
            </div>
            <div className="input_wrapper">
              <div className="field_header">
                <label>Position:</label>
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => handleEditCvClick("position")}
                ></i>
              </div>
              {isCvEditing.position ? (
                <div>
                  <input
                    type="text"
                    value={cv.position}
                    onChange={(e) => handleInputCvChange(e, "position")}
                  />
                  <div className="button">
                    <button onClick={() => handleSaveCvClick("position")}>
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button onClick={() => handleCancelCvClick("position")}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <span>{cv?.position}</span>
                  </p>
                </div>
              )}
            </div>
            <div className="input_wrapper">
              <div className="field_header">
                <label>Cv Image: </label>
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => handleEditCvClick("image")}
                ></i>
              </div>
              {isCvEditing.image ? (
                <div>
                  <input
                    type="text"
                    value={cv.image}
                    onChange={(e) => handleInputCvChange(e, "image")}
                  />
                  <div className="button">
                    <button onClick={() => handleSaveCvClick("image")}>
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button onClick={() => handleCancelCvClick("image")}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <span>{cv?.image}</span>
                  </p>
                </div>
              )}
            </div>
          </section>
        </Element>
        <Education />
        <Experience />
      </div>
    </div>
  );
};

export default Profile;

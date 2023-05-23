import React, { useState, useEffect } from "react";
import { Element } from 'react-scroll';
import { Link } from "react-scroll";
import "./profile.css";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `http://localhost:8800/profile/${user._id}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);
  console.log(profile);

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

  return (
    <div className="profile_wrapper">
      <nav className="profile_nav">
        <h1>Welcome {profile?.name}!</h1>
        <ul>
          <li>
            <Link
              activeClass="active"
              to="profile"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              tabIndex={0}
            >
              Profile
            </Link>
          </li>
          <li>
          <Link
              activeClass="active"
              to="cv"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              tabIndex={0}
            >
              Cv
            </Link>
          </li>
        </ul>
      </nav>
      <div className="main">

      {profile && (
        <Element name="profile" className="profile_main">
        <section id="profile">
          <div>
            <label>Name: </label>
            {isEditing.name ? (
              <div>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
                <button onClick={() => handleSaveClick("name")}>Save</button>
              </div>
            ) : (
              <div>
                {profile.name}
                <button onClick={() => handleEditClick("name")}>Edit</button>
              </div>
            )}
          </div>
          <div>
            <label>Position: </label>
            {isEditing.position ? (
              <div>
                <input
                  type="text"
                  value={profile.position}
                  onChange={(e) => handleInputChange(e, "position")}
                />
                <button onClick={() => handleSaveClick("position")}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                {profile.position}
                <button onClick={() => handleEditClick("position")}>
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Description: </label>
            {isEditing.description ? (
              <div>
                <input
                  type="text"
                  value={profile.description}
                  onChange={(e) => handleInputChange(e, "description")}
                />
                <button onClick={() => handleSaveClick("description")}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                {profile.description}
                <button onClick={() => handleEditClick("description")}>
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Website Link: </label>
            {isEditing.website_link ? (
              <div>
                <input
                  type="text"
                  value={profile.website_link}
                  onChange={(e) => handleInputChange(e, "website_link")}
                />
                <button onClick={() => handleSaveClick("website_link")}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                {profile.website_link}
                <button onClick={() => handleEditClick("website_link")}>
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Facebook: </label>
            {isEditing.facebook ? (
              <div>
                <input
                  type="text"
                  value={profile.facebook}
                  onChange={(e) => handleInputChange(e, "facebook")}
                />
                <button onClick={() => handleSaveClick("facebook")}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                {profile.facebook}
                <button onClick={() => handleEditClick("facebook")}>
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Instagram: </label>
            {isEditing.instagram ? (
              <div>
                <input
                  type="text"
                  value={profile.instagram}
                  onChange={(e) => handleInputChange(e, "instagram")}
                />
                <button onClick={() => handleSaveClick("instagram")}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                {profile.instagram}
                <button onClick={() => handleEditClick("instagram")}>
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <label>Github: </label>
            {isEditing.github ? (
              <div>
                <input
                  type="text"
                  value={profile.github}
                  onChange={(e) => handleInputChange(e, "github")}
                />
                <button onClick={() => handleSaveClick("github")}>Save</button>
              </div>
            ) : (
              <div>
                {profile.github}
                <button onClick={() => handleEditClick("github")}>Edit</button>
              </div>
            )}
          </div>
          <div>
            <label>LinkedIn: </label>
            {isEditing.linkedin ? (
              <div>
                <input
                  type="text"
                  value={profile.linkedin}
                  onChange={(e) => handleInputChange(e, "linkedin")}
                />
                <button onClick={() => handleSaveClick("linkedin")}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                {profile.linkedin}
                <button onClick={() => handleEditClick("linkedin")}>
                  Edit
                </button>
              </div>
            )}
          </div>
        </section>
        </Element>
      )}
      <Element name="cv" className="cv_main">
        <section id="cv">
          hello
        </section>
        </Element>
      </div>
    </div>
  );
};

export default Profile;

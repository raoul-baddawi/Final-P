import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { Link } from "react-scroll";
// import empty from '../../Assets/card.png'
import "./dashboard.css";
import noimage from "../../Assets/noimage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashMsgs from "../../Components/DashMessages/DashMsgs";
import DashProject from "../../Components/Projectdash/ProjectsDash";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [all, setAll] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editedRole, setEditedRole] = useState("");
  const [editingUserId, setEditingUserId] = useState("");
  const [load, setLoad] = useState(false);
  const [loadd, setLoadd] = useState(false);
  const [done, setDone] = useState(false);
  const [donee, setDonee] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEducation, setShowEducation] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    position: "",
    user_type: "",
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter members based on the search query or return all members if the search query is empty
  const filteredMembers = members.filter((member) => {
    const memberName = member.username;
    return memberName && memberName.toLowerCase().includes(searchQuery.toLowerCase());
  });


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `https://appreciate-b.onrender.com/api/users/getall`
        );
        setAll(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // console.log(all)

  useEffect(() => {
    const filteredMembers = all.filter((user) => user.role === "admin");
    const filteredUsers = all.filter((user) => user.role === "user");
    setMembers(filteredMembers);
    setUsers(filteredUsers);
  }, [all]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    // event.preventDefault();

    try {
      const resp=  await axios.post("http://localhost:8800/api/admin", formData);
      window.location.reload();
      console.log(resp)
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  const deleteUser = async (id) => {
    setLoad(true);
    try {
      await axios.delete(`http://localhost:8800/api/delete/${id}`);
      setLoad(false);
      setDone(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  const handleRoleUpdate = async (userId) => {
    try {
      await axios.patch(
        `https://appreciate-b.onrender.com/api/user/${userId}`,
        {
          role: editedRole,
        }
      );
      console.log("User role updated successfully");
      setEditingUserId("");
      setEditedRole("");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };
 

  const handleAdminPromote = async (userId) => {
    setLoadd(true);
    try {
      const response = await axios.patch(
        `https://appreciate-b.onrender.com/api/user/${userId}`,
        { role: "admin" }
      );
      setLoadd(false);
      if (response.status === 200) {
        setDonee(true);
        console.log("User role updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setLoadd(false);
      console.error("Error updating user role:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId("");
    setEditedRole("");
  };

  const handleEditClick = (userId, currentRole) => {
    setEditingUserId(userId);
    setEditedRole(currentRole);
  };
  // console.log(members);
  return (
    <section id="dashboard">
      <div className="nav_wrapper">
        <nav className={show ? "profile_nav visible" : "profile_nav hidden"}>
          <h1>
            Welcome <i>{user?.username}!</i>
          </h1>
          <ul>
            <div className="li_wrapper">
              <Link
                activeClass="active"
                to="usersdash"
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
                  Users
                </li>
              </Link>

              <Link
                activeClass="active"
                to="members"
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
                  Members
                </li>
              </Link>
              <Link
                activeClass="active"
                to="msgs-dash"
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
                  <i className="fa-regular fa-envelope"></i>
                  Messages
                </li>
              </Link>
              <Link
                activeClass="active"
                to="project"
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
                <i className="fa-sharp fa-solid fa-globe"></i>
                  Projects
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
        {users && (
          <Element name="usersdash" className="profile_main usersdash">
            <h1>
              Users{" "}
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
            <section id="usersdash">
              <div className="users_table">
                {users && users.length > 0 ? (
                  users.map((user, index) => (
                    <div className="user_row" key={index}>
                      <img
                        src={
                          user?.profile?.image?.length > 3
                            ? user.profile?.image
                            : noimage
                        }
                        alt="usr pic"
                      />
                      <h3>{user.username}</h3>
                      <p>{user.email}</p>
                      <span>{user.role}</span>
                      <button
                        className="promote"
                        style={
                          loadd && selectedUser === user._id
                            ? { padding: 0, width: "80px" }
                            : { width: "80px" }
                        }
                        onClick={() => {
                          setSelectedUser(user._id);
                          handleAdminPromote(user._id);
                        }}
                      >
                        {loadd && selectedUser === user._id ? (
                          <div className="loading">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        ) : (
                          <>
                            <span
                              style={
                                donee && selectedUser === user._id
                                  ? { display: "none" }
                                  : null
                              }
                            >
                              Promote
                            </span>
                            <span
                              style={
                                donee && selectedUser === user._id
                                  ? { display: "none" }
                                  : null
                              }
                            >
                              Sure ?
                            </span>
                          </>
                        )}
                        {donee && selectedUser === user._id ? (
                          <span
                            className="span"
                            style={
                              donee && selectedUser === user._id
                                ? { zIndex: 10 }
                                : { zIndex: -10 }
                            }
                          >
                            Done
                          </span>
                        ) : null}
                      </button>
                      <button
                        style={
                          load && selectedUser === user._id
                            ? { padding: 0, width: "80px" }
                            : { width: "80px" }
                        }
                        onClick={() => {
                          deleteUser(user._id);
                          setSelectedUser(user._id); // Set the selected user's ID
                        }}
                      >
                        {load && selectedUser === user._id ? (
                          <div className="loading">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        ) : (
                          <>
                            <span
                              style={
                                done && selectedUser === user._id
                                  ? { display: "none" }
                                  : null
                              }
                            >
                              Delete
                            </span>
                            <span
                              style={
                                done && selectedUser === user._id
                                  ? { display: "none" }
                                  : null
                              }
                            >
                              Sure ?
                            </span>
                          </>
                        )}
                        {done && selectedUser === user._id ? (
                          <span
                            className="span"
                            style={
                              done && selectedUser === user._id
                                ? { zIndex: 10 }
                                : { zIndex: -10 }
                            }
                          >
                            Done
                          </span>
                        ) : null}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-users">
                    <h1>Wow!, No users found!</h1>
                    <div className="img-nusrs"></div>
                    <p>
                      Looks like there is no users with the type{" "}
                      <span>"user"</span> at this time!
                    </p>
                  </div>
                )}
              </div>
            </section>
          </Element>
        )}

        <Element name="members" className="cv_main members_main">
          <h1>
            Members
            <button
              className="add_dash"
              onClick={() => {
                setShowEducation(true);
              }}
            >
              <i className="fa-sharp fa-regular fa-plus"></i>
              Add
            </button>
          </h1>
          <input
          className="search-input"
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
          <section id="members">
            <div className={showEducation ? "animated_add showw" : "hide"}>
              <form className="animated_form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label htmlFor="position">Position:</label>
                <input
                  type="text"
                  name="position"
                  id="position"

                  value={formData.position}
                  onChange={handleInputChange}
                />
                <label htmlFor="user_type">User Type:</label>
                <input
                  type="text"
                  name="user_type"
                  id="user_type"
                  value={formData.user_type}
                  onChange={handleInputChange}
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
                      setShowEducation(false);
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="member_wrap">
            {filteredMembers.length > 0 ? (
        filteredMembers.map((member, index) => (
                  <div className="member_card" key={index}>
                    <div className="member_card-head">
                      <img src={noimage} alt="member img" />
                    </div>
                    <div className="member_card-body">
                      <h2>{member.username}</h2>
                      {editingUserId === member._id ? (
                        <>
                          <input
                            type="text"
                            value={editedRole}
                            onChange={(e) => setEditedRole(e.target.value)}
                          />
                          <button
                            className="edit_member"
                            onClick={() => handleRoleUpdate(member._id)}
                          >
                            <span>Save</span>
                          </button>
                          <button
                            className="edit_member"
                            onClick={handleCancelEdit}
                          >
                            <span>Cancel</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <p
                            style={
                              member.profile.user_type === "dev"
                                ? { color: "blue" }
                                : { color: "red" }
                            }
                          >
                            {member.profile.user_type} & {member.role}
                          </p>
                          <p>{member.profile.position}</p>
                          <p>{member.email}</p>
                          <div className="social_wrap_members">
                            {member.profile.facebook > 4 ? (
                              <span style={{ "--clr": "#1877f2" }}>
                                <a href={member.profile.facebook}>
                                  <i className="fa-brands fa-facebook-f"></i>
                                </a>
                              </span>
                            ) : null}

                            {member.profile.instagram > 4 ? (
                              <span style={{ "--clr": "#c32aa3" }}>
                                <a href={member.profile.instagram}>
                                  <i className="fa-brands fa-instagram"></i>
                                </a>
                              </span>
                            ) : null}

                            {member.profile.linkedin > 4 ? (
                              <span style={{ "--clr": "#1da1f2" }}>
                                <a href={member.profile.linkedin}>
                                  <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                              </span>
                            ) : null}

                            {member.profile.github > 4 ? (
                              <span
                                style={{ "--clr": "#000000" }}
                                className="blacko"
                              >
                                <a href={member.profile.github}>
                                  <i className="fa-brands fa-github"></i>
                                </a>
                              </span>
                            ) : null}
                          </div>
                          <div className="mmbr-wrp">
                            <button
                              className="edit_member"
                              onClick={() =>
                                handleEditClick(member._id, member.role)
                              }
                            >
                              <span>Edit</span>
                            </button>
                            <button
                              className="edit_member del"
                              onClick={() => deleteUser(member._id)}
                            >
                              <span>Delete</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
               ))
               ) : (
                 <p>No members found.</p>
               )}
            </div>
          </section>
        </Element>
        <DashMsgs />
        <DashProject />
      </div>
    </section>
  );
};

export default Dashboard;
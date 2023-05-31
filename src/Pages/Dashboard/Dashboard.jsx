import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { Link } from "react-scroll";
import "./dashboard.css";
import noimage from "../../Assets/noimage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [all, setAll] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [editedRole, setEditedRole] = useState("");
  const [editingUserId, setEditingUserId] = useState("");

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

  useEffect(() => {
    const filteredMembers = all.filter((user) => user.role !== "user");
    const filteredUsers = all.filter((user) => user.role === "user");
    setMembers(filteredMembers);
    setUsers(filteredUsers);
  }, [all]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://appreciate-b.onrender.com/api/delete/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(users);
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  const handleRoleUpdate = async (userId) => {
    try {
      await axios.patch(`https://appreciate-b.onrender.com/api/user/${userId}`, {
        role: editedRole,
      });
      console.log("User role updated successfully");
      // Update the state or perform any other necessary actions
      setEditingUserId("");
      setEditedRole("");
    } catch (error) {
      console.error("Error updating user role:", error);
      // Handle the error if needed
    }
  };


  const handleAdminPromote = async (userId) => {
    try {
      const response = await axios.patch(`https://appreciate-b.onrender.com/api/user/${userId}`, { role: 'admin' });
  
      if (response.status === 200) {
        console.log('User role updated successfully');
        // You can add any additional logic here after the role is updated
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      // Handle the error state or display an error message to the user
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
  console.log(members);
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
                to="messages"
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
                <i class="fa-regular fa-envelope"></i>
                  Messages
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
                {users &&
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
                      <button onClick={() => handleAdminPromote(user._id)}>
                        <span>Promote</span>
                        <span>Sure ?</span>
                      </button>
                      <button onClick={() => deleteUser(user._id)}>
                        <span>Delete</span>
                        <span>Sure ?</span>
                      </button>
                    </div>
                  ))}
              </div>
            </section>
          </Element>
        )}

        <Element name="members" className="cv_main members_main">
          <h1>Members</h1>
          <section id="members">
            <div className="member_wrap">
              {members &&
                members.map((member, index) => (
                  <div className="member_card" key={index}>
                    <div className="member_card-head">
                      <img src={noimage} alt="member img" />
                    </div>
                    <div className="member_card-body">
                      <h2>{member.profile.name}</h2>
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
                                  <i class="fa-brands fa-facebook-f"></i>
                                </a>
                              </span>
                            ) : null}

                            {member.profile.instagram > 4 ? (
                              <span style={{ "--clr": "#c32aa3" }}>
                                <a href={member.profile.instagram}>
                                  <i class="fa-brands fa-instagram"></i>
                                </a>
                              </span>
                            ) : null}

                            {member.profile.linkedin > 4 ? (
                              <span style={{ "--clr": "#1da1f2" }}>
                                <a href={member.profile.linkedin}>
                                  <i class="fa-brands fa-linkedin-in"></i>
                                </a>
                              </span>
                            ) : null}

                            {member.profile.github > 4 ? (
                              <span
                                style={{ "--clr": "#000000" }}
                                className="blacko"
                              >
                                <a href={member.profile.github}>
                                  <i class="fa-brands fa-github"></i>
                                </a>
                              </span>
                            ) : null}
                          </div>
                          <button
                            className="edit_member"
                            onClick={() =>
                              handleEditClick(member._id, member.role)
                            }
                          >
                            <span>Edit</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </Element>
      </div>
    </section>
  );
};

export default Dashboard;

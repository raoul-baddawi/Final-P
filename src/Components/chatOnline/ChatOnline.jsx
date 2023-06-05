import axios from "axios";
import { useEffect, useState } from "react";
import NoImage from "../../Assets/noimage.png";
import "./chatOnline.css";

import Loader from '../Loader/Loader'
export default function ChatOnline({ currentId, setCurrentChat, setRefresh, refresh, reload}) {
  const [done, setDone] = useState(false);
  const [load, setLoad] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const senderId = user._id
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState([]);
  const createConversation = async (receiverId) => {
    setLoad(true);
    await axios.post('https://appreciate-b.onrender.com/api/conversations/', {senderId, receiverId });
    setLoad(false);
    setDone(true);
    setTimeout(() => {
     setDone(false)
    }, 2000);
    setRefresh((prev)=>!prev)
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`https://appreciate-b.onrender.com/api/conversations/${user._id}`);
        const conversations = response.data;
        const members = conversations.map((conversation) => conversation.members).flat();
        const response2 = await axios.get(`https://appreciate-b.onrender.com/api/users/getall`);
        const users = response2.data.filter(users=> users._id !== user._id);
        const filteredUsers = users.filter((user) => !members.includes(user._id) && user._id !== user._Id);
        setUsers(filteredUsers);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [user._id, refresh, reload]);
  

  // useEffect(() => {
  //   setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  // }, [friends, onlineUsers]);

  // const handleClick = async (user) => {
  //   try {
  //     const res = await axios.get(
  //       `https://appreciate-b.onrender.com/api/conversations/find/${currentId}/${user._id}`
  //     );
  //     setCurrentChat(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // onClick={() => handleClick(user)}


  // console.log(users)
  return (
    <div className="chatOnline cht-online-resp">


      {users.length < 1 ? <Loader /> : users.map((user) => (
        <div className="chatOnlineFriend" key={user._id}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={user.profile?.image?.length > 3 ? user.profile?.image : NoImage}
              alt=""
            />
            {/* <div className="chatOnlineBadge"></div> */}
          </div>
          <div className="usr-name-wrp">
            <span className="chatOnlineName">{user?.username}</span>
            <p>{user?.profile?.position}</p>





            <button
            className="promote"
                        style={
                          load && selectedUser === user._id
                            ? { padding: 0, width: "80px" }
                            : { width: "80px" }
                        }
                        onClick={() => {
                          createConversation(user._id)
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
                            className="span"
                              style={
                                done && selectedUser === user._id
                                  ? { display: "none" }
                                  : null
                              }
                            >
                              Chat now
                            </span>
                            <span
                            className="span"
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
            {/* <button className="clickme" onClick={() => createConversation(user._id)}>chat now</button> */}
          </div>
        </div>
      ))}
    </div>
  );


  // .chatOnlineFriend
}

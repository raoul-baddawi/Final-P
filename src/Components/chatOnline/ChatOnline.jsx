import axios from "axios";
import { useEffect, useState } from "react";
import NoImage from "../../Assets/noimage.png";
import "./chatOnline.css";

export default function ChatOnline({ currentId, setCurrentChat, setRefresh, refresh, reload}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const senderId = user._id
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState([]);
  const createConversation = async (receiverId) => {
    await axios.post('http://localhost:8800/api/conversations/', {senderId, receiverId });
    setRefresh((prev)=>!prev)
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/conversations/${user._id}`);
        const conversations = response.data;
        const members = conversations.map((conversation) => conversation.members).flat();
        const response2 = await axios.get(`http://localhost:8800/api/users/getall`);
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

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="chatOnline">
      {users.map((user) => (
        <div className="chatOnlineFriend" key={user._id} onClick={() => handleClick(user)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={user.profile?.image.length > 3 ? user.profile?.image : NoImage}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <div className="usr-name-wrp">
            <span className="chatOnlineName">{user?.username}</span>
            <p className="clickme" onClick={() => createConversation(user._id)}>chat now</p>
          </div>
        </div>
      ))}
    </div>
  );
}

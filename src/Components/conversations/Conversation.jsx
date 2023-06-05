import axios from "axios";
import { useEffect, useState } from "react";
import NoImage from "../../Assets/noimage.png";
import "./conversation.css";

export default function Conversation({ conversation, currentUser , setSide}) {
  const [user, setUser] = useState([])

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("https://appreciate-b.onrender.com/api/users/" + friendId); 
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser(); 
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img src={user.profile || NoImage} className="conversationImg" alt="hello" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

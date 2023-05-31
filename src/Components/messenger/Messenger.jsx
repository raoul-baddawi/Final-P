import "./messenger.css";
import Conversation from "../../Components/conversations/Conversation";
import Message from "../../Components/message/Message";
import ChatOnline from "../../Components/chatOnline/ChatOnline";
import { useEffect, useRef, useState} from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [photo, setPhoto] = useState({});
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const socket = useRef()
  
  // const { user } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const scrollRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    async function init(){
      let data={id:user._id}
      socket.current.emit("user",data)
      } 
    socket.current = io("ws://localhost:8800");
    init()

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
      // console.log(arrivalMessage)

  }, [arrivalMessage, currentChat]);
  

  useEffect(() => { 
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users)
      setOnlineUsers(
        users.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]); 

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/conversations/" + user._id);
        setConversations(res.data);
      //  console.log("res.data----- ", res.data[0].members[0], res.data[0].members[1])
        const minePhoto = await axios.get("http://localhost:8800/profile/" + res.data[0].members[0]);
        const hisPhoto = await axios.get("http://localhost:8800/profile/" + res.data[0].members[1]);
        setPhoto({minePhoto, hisPhoto})
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
    // console.log("refreshed")
    // console.log("aaaa",currentChat)
  }, [arrivalMessage, user._id,currentChat, refresh]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/messages/${currentChat&&currentChat._id}`);
        // console.log(res.data,user._id)
        setMessages(res.data);
        // console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat,user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    user._id && socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:8800/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="chat-header">
              <h1>Chat</h1>
            </div>
            {conversations.map((c,index) => (
              <div  onClick={() => {
                setCurrentChat(c);
                setActive(c._id);
              }}
              key={index}
              className={active === c._id ? 'nothing active' : 'nothing'} >
                <div className="for-effect"></div>
                <Conversation conversation={c} currentUser={user}  />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m ,index) => (
                    <div ref={scrollRef}  key={index}>
                     
                      <Message message={m} own={m.sender === user._id} photo={photo}/>
                    </div>
                  ))
                  }
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
              setRefresh={setRefresh}
              refresh={refresh}
              reload={arrivalMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

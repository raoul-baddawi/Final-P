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
  const [side, setSide] = useState(false)
  const socket = useRef()
  const sendIt = useRef(null);
  
  
  // const { user } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));

  // const scrollRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    async function init(){
      let data={id:user._id}
      socket.current.emit("user",data)
      } 
    socket.current = io("ws://appreciate-b.onrender.com");
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

  }, [arrivalMessage, currentChat]);
  

  useEffect(() => { 
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        users.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]); 

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("https://appreciate-b.onrender.com/api/conversations/" + user._id);
        setConversations(res.data);
        const minePhoto = await axios.get("https://appreciate-b.onrender.com/profile/" + res.data[0].members[0]);
        const hisPhoto = await axios.get("https://appreciate-b.onrender.com/profile/" + res.data[0].members[1]);
        setPhoto({minePhoto, hisPhoto})
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [arrivalMessage, user._id,currentChat, refresh]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`https://appreciate-b.onrender.com/api/messages/${currentChat&&currentChat._id}`);
        setMessages(res.data);
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
      const res = await axios.post("https://appreciate-b.onrender.com/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const chatBoxRef = useRef();

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.click();
    }
  };

  

  const handleKeySenDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendIt.current.click();  
    }
  };


  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);


  return (
    <>
      <div className={side ? "messenger-side messenger" : "messenger"}>
        <div className={side ? "chatMenu paddingchat" : "chatMenu"}>
          <div className="chatMenuWrapper">
            <div className="chat-header">
              <h1>Chat</h1>
            </div>
            {conversations.map((c,index) => (
              <div  onClick={() => {
                setCurrentChat(c);
                setActive(c._id);
                setSide(false);
              }}
              key={index}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className={active === c._id ? 'nothing active' : 'nothing'} >
                <div className="for-effect"></div>
                <Conversation conversation={c} currentUser={user}  setSide={setSide}/>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <button className={side ? "side-bar-trigger toleft" : "side-bar-trigger toright"} onClick={()=>{
            setSide(!side)
          }}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m ,index) => (
                    <div  key={index}>
                     
                      <Message message={m} own={m.sender === user._id} photo={photo} scrollRef={chatBoxRef}/>
                    </div>
                  ))
                  }
                    <div ref={chatBoxRef}></div>
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    onKeyDown={handleKeySenDown}
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit} ref={sendIt} >
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
        <div className="chatOnline cht-online-resp">
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

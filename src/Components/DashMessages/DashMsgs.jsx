import React, { useEffect, useState } from "react";
import "./dashmsgs.css";
import { Element } from "react-scroll";
import axios from "axios";

const DashMsgs = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchDashboardMessages = async () => {
      try {
        const response = await axios.get(
          `https://appreciate-b.onrender.com/contactus`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://appreciate-b.onrender.com/contactus/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Element name="msgs-dash" id="also">
      <div id="msgs-dash">
      <h1 className="also_h1">Messages</h1>

        <section id="msgs-incomes">
          
          <div className="all_messages_wrapper">


          {messages && messages.map((message, index)=>(
            <div className="msg" key={index}>
            <p>{message.fullName}</p>
            <span>{message.email}</span>
            <p>
            {message.Message}
            </p>
            <div className="btndel_wrapper">
              <a
              href={`mailto:${message.email}`}
                className="msgs_btn link-amsg"
                // onClick={() => deleteUser(member._id)}
              >
                Contact
              </a>
              <button
              onClick={()=>{
                handleDelete(message._id)
              }}
                className="msgs_btn link-a-dlt"
              >
                Delete
              </button>
            </div>
          </div>
          ))}

           
          </div>
        </section>
      </div>
    </Element>
  );
};

export default DashMsgs;

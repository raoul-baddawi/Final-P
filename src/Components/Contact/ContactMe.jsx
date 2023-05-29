import React, { useState, useRef } from "react";
import { Element } from "react-scroll";
import emailjs from "@emailjs/browser";
import axios from "axios";
import './contactme.css'

const ContactMe = () => {
  const form = useRef();
  const [error, setError] = useState(null);

  const [myData, setmyData] = useState({
    fullName: "",
    mail: "",
    Message: "",
  });
  const { fullName, mail, Message } = myData;

  const onChange = (e) => {
    setmyData({ ...myData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_51q4gui",
        "template_b9ajebw",
        form.current,
        "xGN8ZyR34jEIrY5x2"
      );

     
      form.current.reset();
    } catch (error) {
      console.log("email sending failed", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!mail) {
      setError("Email is required");
      return;
    }
    setError(null);
    const newContact = {
      fullName: fullName,
      mail: mail,
      Message: Message,
    };
    await sendEmail(e);

    try {
      await axios.post("http://localhost:8800/contactus", newContact);
      setmyData({
        fullName: "",
        mail: "",
        Message: "",
      });
    } catch (err) {
      console.log("error", err.response.data);
    }
  };
  return (
    <Element name="contact" className="contact-hide">
      <div className="contact_me-container" id="contact">
        <h1>Drop me an email!</h1>
        <form className="contact-form" ref={form} onSubmit={onSubmit}>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  placeholder="Enter your Full name"
                  onChange={onChange}
                  required
                />
                <input
                  type="text"
                  name="mail"
                  value={mail}
                  placeholder="Enter your email "
                  onChange={onChange}
                  required
                />
                {error === "Email is required" && (
                  <div style={{ color: "red" }}>{error}</div>
                )}
                <textarea
                  className="message"
                  type="text"
                  name="Message"
                  value={Message}
                  placeholder="Enter your Message"
                  onChange={onChange}
                  required
                />
                <button className="form-sbmt" type="submit" onClick={onSubmit}>
                  SEND
                </button>
              </form>
      </div>
    </Element>
  );
};

export default ContactMe;

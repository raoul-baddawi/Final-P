import React, { useState, useRef, useEffect } from "react";
import { Element } from "react-scroll";
import emailjs from "@emailjs/browser";
import axios from "axios";
import "./contactme.css";

const ContactMe = () => {
  const form = useRef();
  const [error, setError] = useState(null);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [message, setMessage] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState([]);

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

    if (!mail || !fullName || !Message) {
      setError("Plz fill in all fields");
      return;
    }

    setLoaded(true);
    setError(null);
    const newContact = {
      fullName: fullName,
      mail: mail,
      Message: Message,
    };
    await sendEmail(e);

    try {
      const response = await axios.post(
        "https://appreciate-b.onrender.com/contactus",
        newContact
      );
      setInfo(response.data);
      setLoaded(false);
      setMessage(true);
      setTimeout(() => {
        setmyData({
          fullName: "",
          mail: "",
          Message: "",
        });
        setMessage(false);
        setInfo(null);
      }, 3000);
    } catch (err) {
      console.log("error", err.response.data);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const contactElement = document.getElementById("contact");
      const rect = contactElement.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      setIsContactVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            id="footer-input"
            className={isContactVisible ? "glowing" : ""}
          />
          <input
            type="text"
            name="mail"
            value={mail}
            placeholder="Enter your email "
            onChange={onChange}
            required
            className={isContactVisible ? "glowing" : ""}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <textarea
            type="text"
            name="Message"
            value={Message}
            placeholder="Enter your Message"
            onChange={onChange}
            required
            className={isContactVisible ? "glowing message" : "message"}
          />
          <div className="butt">
            <button className="form-sbmt" type="submit" onClick={onSubmit}>
              {!loaded ? (
                <span>SEND</span>
              ) : (
                <svg viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              )}
            </button>
            {message ? (
              <p className="done-email">
                Thank you for your message <i>{info.fullName}</i>,<br></br> I
                will reply back soon!
                {console.log(info)}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </Element>
  );
};

export default ContactMe;

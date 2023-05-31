import React from "react";
import "./auth.css";
// import hash from 'hash-it';
import { useNavigate } from "react-router";
import "./auth.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import { useContext } from 'react';
// import { MyContext } from '../../myContext';

function Auth() {
  const [zih, setZih] = useState(false);
  const [message, setMessage] = useState(' ')
  const [showMessage, setShowMessage] = useState(false)
  let navigate = useNavigate();

  function activateZih() {
    setZih(true);
  }

  function deactivateZih() {
    setZih(false);
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://appreciate-b.onrender.com/api/auth/login",
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );
      if (response.data.role === "superAdmin") {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      } else {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response.data.message)
      setShowMessage(true)
      console.log(error.response.data.message);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://appreciate-b.onrender.com/api/auth/register",
        {
          username: event.target.name.value,
          email: event.target.Email.value,
          password: event.target.Password.value,
        }
      );
      if (response.status === 201 && response.data.role === "superAdmin") {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      } else {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
      // handle successful registration
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showMessage]);

  return (
    <div className="main_auth-wrp">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="J-popup-wrapper">
        <div className="all-wrapper">
          <div className="all-wrapper-child">
            <div className="ask-login jiji">
              <h3>Have an account?</h3>
              <button onClick={deactivateZih} className="buttonn">
                <span className="button-content">Login</span>
              </button>
            </div>
            <div className="ask-signup jiji">
              <h3>Don't have an account?</h3>
              <button onClick={activateZih} className="buttonn">
                <span className="button-content">Register</span>
              </button>
            </div>
          </div>
          <div className="main-f-wrapper">
            <div className={zih ? "J-forms-wrapper-zih" : "J-forms-wrapper"}>
              <div
                className={
                  zih
                    ? "left-right-wrapper-zih left-right-wrapper"
                    : "left-right-wrapper"
                }
              >
                <form onSubmit={handleLoginSubmit}>
                  <h1>Login</h1>
                  {showMessage && <p>{message}</p>}
                  <input
                    id="email"
                    type="text"
                    required
                    placeholder="Your email"
                  />
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="Your password"
                  />
                  <button type="submit" className="buttonn">
                    <span className="button-content">Login</span>
                  </button>
                </form>

                <form onSubmit={handleRegisterSubmit}>
                  <h1>Register</h1>
                  {showMessage && <p>{message}</p>}
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                  />
                  <input
                    id="Email"
                    type="text"
                    required
                    placeholder="Enter your email"
                  />
                  <input
                    id="Password"
                    type="password"
                    required
                    placeholder="Enter your password"
                  />
                  <button type="submit" className="buttonn">
                    <span className="button-content">Register</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

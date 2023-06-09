import React from "react";
import "./loginup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


function LoginUp() {
  const [invalid, setInvalid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  
  let navigate=useNavigate()
  const [lol, setLol]= useState(false)

  function login(){
    setLol(true)
  }

  function register(){
    setLol(false)
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        "https://appreciate-b.onrender.com/api/auth/login",
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );
      if(response.data.role === "superAdmin"){
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoading(false)
       navigate('/dashboard')
      }else{
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoading(false)
        navigate("/")
      }
    } catch (error) {
      setLoading(false)
      setInvalid(false)
      setTimeout(() => {
        setInvalid(true);
      }, 3000);
      console.log(error);
    }

  };


  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        "https://appreciate-b.onrender.com/api/auth/register",
        {
          username: event.target.name.value,
          email: event.target.Email.value,
          password: event.target.Password.value,
        }
      );
      if(response.status === 201 && response.data.role === "superAdmin"){
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoading(false)
        navigate("/dashboard")
      }else{
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoading(false)
        navigate("/");
      }
  
      // handle successful registration
    } catch (error) {
      setLoading(false)
      setInvalid(false)
      setError(error.response.data.message)
      setTimeout(() => {
        setInvalid(true);
      }, 3000);
      console.log(error);
    }
  };
  return(
    <>
   
    <section className="log-popup">
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
      <div className="forms-wrapper">
        <div className={lol === true ? "log-header-left" : "log-header"}>
          <h1 className="indicator-title">Login</h1>
          <h1 className="indicator-title">Register</h1>
        </div>
        <div className={lol === true ? "map-left" : "map"}>
          <div className="depending"></div>
          <button className="destination-1" onClick={register}>login</button>
          <button className="destination-2" onClick={login}>register</button>
        </div>
        <div className={lol === true ? "log-body-left" : "log-body"}>
        <form className="login child" onSubmit={handleLoginSubmit}>
            {invalid === false ? <p className="error-hndl">Invalid Email or password</p> : null}
            <div className="user-input-wrp">
              <input className={invalid ? 'inputText' : 'inputText shake'} id="email" type="text" required />
              <span className="floating-label">Email</span>
            </div>
            <div className="user-input-wrp">
              <input
                className={invalid ? 'inputText' : 'inputText shake'}
                id="password"
                type="password"
                required
              />
              <span className="floating-label">Password</span>
            </div>
            <button className="login-button" type="submit">
              {loading ? (<svg viewBox="25 25 50 50">
                                <circle r="20" cy="50" cx="50"></circle>
                              </svg>): ("Login") }
            </button>
          </form>
          <form className="register child" onSubmit={handleRegisterSubmit}>
          {invalid === false ? <p className="rgst-hndl">{error}</p> : null}
            <div className="user-input-wrp">
              <input className={invalid === true ? 'inputText' : 'inputText shake'} id="name" type="text" required />
              <span className="floating-label">Name</span>
            </div>
            <div className="user-input-wrp">
              <input className={invalid ? 'inputText' : 'inputText shake'} id="Email" type="text" required />
              <span className="floating-label">Email</span>
            </div>
            <div className="user-input-wrp">
              <input
                className={invalid ? 'inputText' : 'inputText shake'}
                id="Password"
                type="password"
                required
              />
              <span className="floating-label">Password</span>
            </div>
            <button className="login-button" type="submit">
            {loading ? (<svg viewBox="25 25 50 50">
                                <circle r="20" cy="50" cx="50"></circle>
                              </svg>): ("Register") }
            </button>
          </form>
        </div>
        <div className="guid">
          <button onClick={()=>{navigate('/')}}>Cancel</button>
        </div>
      </div>
    </section>
   
    </>
  )
}
export default LoginUp;
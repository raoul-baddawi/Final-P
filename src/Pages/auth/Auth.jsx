import React from "react";
import './auth.css'
// import hash from 'hash-it';
import { useNavigate } from "react-router";
import './auth.css'
import { useState } from "react";
import axios from "axios";
// import { useContext } from 'react';
// import { MyContext } from '../../myContext';

function Auth(){
  // const { text, setText } = useContext(MyContext);
  const [zih, setZih] = useState(false)
  let navigate=useNavigate()

  function activateZih(){
    setZih(true)
  }

  function deactivateZih(){
    setZih(false)
  }


  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );
      if(response.data.role==="superAdmin"){      
        localStorage.setItem("user", JSON.stringify(response.data));
       navigate('/ourteam')
      }else{
        localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/")
      }
    } catch (error) {
      console.log(error);
    }

  };


  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        {
          username: event.target.name.value,
          email: event.target.Email.value,
          password: event.target.Password.value,
        }
      );
      if(response.status===201){
        navigate("/")
      }
      localStorage.setItem("user", JSON.stringify(response.data));
      // handle successful registration
    } catch (error) {
      console.log(error);
    }
  };
  return(
    <div className="J-popup-wrapper">
      <div className="svg-head"> 
      <div className={zih ? "svg-wrapper-1 svg-wrapper-12" : "svg-wrapper-1"}>    
        <svg height="250" width="400">
        <polygon points="160,10 360,120 160,220" stroke="lightblue" fill="lightblue" strokeWidth="1" />
        </svg>  
      </div>

      <div className={zih ? "svg-wrapper-1 svg-wrapper-12" : "svg-wrapper-1"}>    
        <svg height="300" width="400">
        <polygon points="160,10 360,120 160,220" stroke="lightblue" fill="lightblue" strokeWidth="1" />
        </svg>  
      </div>
    </div>
      <div className="all-wrapper">

        <div className="all-wrapper-child">
          <div className="ask-login jiji">
                <h3>Have an account?</h3>
                <button onClick={deactivateZih}>Login</button>
          </div>
          <div className="ask-signup jiji">
                <h3>Don't have an account?</h3>
                <button onClick={activateZih}>Register</button>
          </div>
        </div>
          <div className="main-f-wrapper">

              <div className={zih ? "J-forms-wrapper-zih" : "J-forms-wrapper"}>

                <div className={zih ? "left-right-wrapper-zih left-right-wrapper" : "left-right-wrapper"}>
                  <form onSubmit={handleLoginSubmit}>
                    <input id="email" type="text" required placeholder="Your email"/>
                    <input id="password"
                            type="password"
                            required placeholder="Your password"/>
                    <button type="submit">Login</button>
                  </form>


                  <form onSubmit={handleRegisterSubmit}>
                    <input id="name" type="text" required placeholder="Enter your name"/>
                    <input id="Email" type="text" required placeholder="Enter your email"/>
                    <input t id="Password"
                type="password"
                required placeholder="Enter your password"/>
                    <button type="submit">Sign up</button>
                  </form>
                </div>
              </div>

          </div>

      </div>



    </div>
  )
}

export default Auth
import React, { useState } from "react";
import "../../public/index.css";

const Login = () => {
 const [username, setUserName] = useState("");
 const [password, setPassword] = useState("");

 const userNameInputField = (e) => {
  e.preventDefault();
  setUserName(e.target.value);
 };

 const passwordInputField = (e) => {
  e.preventDefault();
  setPassword(e.target.value);
 };

 const submitButton = (e) => {
  // send post fetch request
  const body = { username: username, password: password };
  fetch("/user/signup", {
   method: "POST",
   headers: { "Content-Type": "Application/JSON" },
   body: JSON.stringify(body),
  });
 };

 return (
  // <div>
  <div className="container" id="container">
   <div className="form-container sign-up-container">
    <form>
     <h1>Create Account</h1>
     <div className="social-container">
      <a href="#" className="social">
       <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className="social">
       <i className="fab fa-google-plus-g"></i>
      </a>
      <a href="#" className="social">
       <i className="fab fa-linkedin-in"></i>
      </a>
     </div>
     <span>or use your email for registration</span>
     <input type="text" placeholder="Username" onChange={userNameInputField}/>
     <input type="password" placeholder="Password" onChange={passwordInputField}/>
     <button onClick={submitButton}>Sign Up</button>
    </form>
   </div>
   <div className="form-container sign-in-container">
    <form action="#">
     <h1>Sign in</h1>
     <div className="social-container">
      <a href="#" className="social">
       <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className="social">
       <i className="fab fa-google-plus-g"></i>
      </a>
      <a href="#" className="social">
       <i className="fab fa-linkedin-in"></i>
      </a>
     </div>
     <span>or use your account</span>
     <input type="email" placeholder="Email" />
     <input type="password" placeholder="Password" />
     <a href="#">Forgot your password?</a>
     <button>Sign In</button>
    </form>
   </div>
   <div className="overlay-container">
    <div className="overlay">
     <div className="overlay-panel overlay-left">
      <h1>Welcome Back!</h1>
      <p>To keep connected with us please login with your personal info</p>
      <button className="ghost" id="signIn">
       Sign In
      </button>
     </div>
     <div className="overlay-panel overlay-right">
      <h1>Welcome to AlgoClash!</h1>
      <p>PvP Algo Challenges</p>
      <button className="ghost" id="signUp">
       Sign Up
      </button>
     </div>
    </div>
   </div>
  </div>
  // </div>
 );
};

export default Login;

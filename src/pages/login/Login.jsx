import "./login.css";


import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(UserContext); // Context to manage user state globally
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/user/login",
        { email, password },
        { withCredentials: false } // Update as needed for cookies
      );

      // Store token in localStorage
      localStorage.setItem("token", response.data.access_token);

      // Update user context
      setCurrentUser(response.data.user);

      if (response.data.user && response.data.user.name) {
        setWelcomeMessage(`Welcome ${response.data.user.name}`);
      }

      // Redirect to another page (e.g., bookstore)
      navigate("/store");
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(err.response.data.error || "Login failed!");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="booked_login-container">
      <div className="booked_login-img_container">
        <img src="https://images.unsplash.com/photo-1561379331-b07f7431ade1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlicmFyeXxlbnwwfDF8MHx8fDA%3D" alt="Girl stepping on books to reach a shelf"/>
      </div>
      <div className="booked_form-container">
        <img src="./public/booked_logo.png" className="booked_login-logo"/>
          <div className="booked_form-wrapper">
            <p className="booked_welcome">Welcome!</p>
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit} className="booked_form">
              <label for="email">Email</label>
              <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required/>
              <label for="password">Password</label>
              <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required/>
              <button type="submit" className="booked_button">
              Login
              </button>
            </form>
            {welcomeMessage && <h2>{welcomeMessage}</h2>}
          </div>
      </div>
    </div>
  );
};

export default Login;
``

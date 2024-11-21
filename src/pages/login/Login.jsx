import "./login.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(UserContext); // Context to manage user state globally
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login credentials to the backend
      const response = await axios.post(
        "http://127.0.0.1:5000/user/login",
        { email, password },
        { withCredentials: true } // Include cookies for CSRF protection, if applicable
      );

      // Extract the JWT token from the response
      const token = response.data.access_token;
      if (!token) throw new Error("No token received from the server");

      // Store the JWT token securely in localStorage
      localStorage.setItem("token", token);

      // Decode the JWT token to extract user info
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token: ", decodedToken);

      // Update the user context with user information
      setCurrentUser({
        id: decodedToken.sub,
        email: email,
        is_admin: decodedToken.is_admin,
      });

      // Set a welcome message for the logged-in user
      if (response.data.user?.name) {
        setWelcomeMessage(`Welcome ${response.data.user.name}`);
      }

      // Redirect the user based on their role
      if (decodedToken.is_admin) {
        console.log("Admin user logged in, redirecting to admin page.");
        navigate("/admin"); // Admin page for admins
      } else {
        console.log("Non-admin user logged in, redirecting to store page.");
        navigate("/store"); // Store page for regular users
      }
    } catch (err) {
      console.error("Login error:", err);
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

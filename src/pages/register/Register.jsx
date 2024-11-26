import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './register.css';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://booked-backend.onrender.com/user/register", { name, email, password });
      console.log("Registration successful:", response.data);

      // Set registration status in localStorage
      localStorage.setItem("isRegistered", true);

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      setError(err.response.data.error || "Registration failed.");
    }
  };

  return (
    <div className="booked_login-container">
      <div className="booked_login-img_container">
        <img src="https://images.unsplash.com/photo-1555116505-38ab61800975?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGxpYnJhcnl8ZW58MHwxfDB8fHww"/>
      </div>
      <div className="booked_form-container">
        <img src="./public/booked_logo.png" className="booked_login-logo"/>

        <div className="booked_form-wrapper">
          <p className="booked_welcome">Welcome!</p>
          <h2>Register with us</h2>
          <form className="booked_form" onSubmit={handleSubmit}>
            <label for="name">Name</label>
            <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required/>
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
            <button className="booked_button" type="submit">Register</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

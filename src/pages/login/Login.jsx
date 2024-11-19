import React, { useState } from 'react';
import { useDispatch } from "react-redux";  // If you're using Redux for global state
import { useNavigate } from 'react-router-dom'; // To redirect after login
import axios from 'axios'; // For API calls
import { setAuthToken } from "../../components/Redux/Actions"; // Redux action to store the token (if using Redux)
import './Login.css'; // Your custom styles

const Login = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch(); // For redux (optional)
  const navigate = useNavigate(); // To navigate after successful login

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // Send API request to authenticate
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        // Store token (either in localStorage or Redux)
        localStorage.setItem('authToken', response.data.token); // Example using localStorage
        dispatch(setAuthToken(response.data.token)); // Store token in Redux if using Redux

        // Redirect user to home/dashboard after login
        navigate('/dashboard'); // You can redirect to any page
      }
    } catch (error) {
      setErrorMessage('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="signup-link">
        <p>Don't have an account?</p>
        <a href="/signup">Sign up here</a>
      </div>
    </div>
  );
};

export default Login;

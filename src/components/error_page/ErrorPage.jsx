import React from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting to homepage or other pages

const ErrorPage = ({ errorCode, errorMessage }) => {
  const navigate = useNavigate();

  // Function to navigate back to the homepage or other page
  const goHome = () => {
    navigate('/');
  };

  // Default error message for unknown errors
  const defaultMessage = 'Something went wrong. Please try again later.';

  return (
    <div className="error-container">
      <div className="error-content">
        {/* Error Code */}
        <h1 className="error-code">{errorCode || 'Error'}</h1>
        
        {/* Display error message */}
        <p className="error-message">
          {errorMessage || defaultMessage}
        </p>
        
        {/* Optional Button to redirect to homepage */}
        <button onClick={goHome} className="go-home-button">
          Go back to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        {/* Animated Background Element */}
        <div className="glow-circle"></div>
        
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Oops! You've drifted into deep space.</h2>
        <p className="error-description">
          The page you are looking for doesn't exist or has been moved to a 
          different dimension. Let's get you back to the terminal.
        </p>

        <div className="error-actions">
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary-custom"
          >
            Return Home
          </button>
          <button 
            onClick={() => navigate(-1)} 
            className="btn-outline-custom"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Subtle decorative code snippet */}
      <div className="code-watermark">
        <code>{`if (page === undefined) { return <NotFound /> }`}</code>
      </div>
    </div>
  );
}
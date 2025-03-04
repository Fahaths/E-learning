import React, { useState } from 'react';
import './Auth.css'; // Assuming you want to style this component separately

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="auth-container">
      <button onClick={toggleAuthMode}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" required />
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
    </div>
  );
};

export default Auth;

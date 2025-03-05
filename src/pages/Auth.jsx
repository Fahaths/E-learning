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
      <button className="toggle-auth-button" onClick={toggleAuthMode}>

        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <div className="input-container">
          <label htmlFor="email"></label>
          <input type="email" placeholder='Email' id="email" required />
        </div>
        

        <div className="input-container">
          <label htmlFor="password"></label>
          <input type="password" placeholder='Password'  id="password" required />
        </div>
        

        {!isLogin && (
          <div className="input-container">
            <label htmlFor="confirmPassword"></label>
            <input type="password" placeholder='Confirm Password' id="confirmPassword" required />
          </div>
        )}

        <button className='submit' type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
    </div>
  );
};

export default Auth;

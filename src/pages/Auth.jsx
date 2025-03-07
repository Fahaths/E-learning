import React, { useState } from 'react';
import './Auth.css'; // Assuming you want to style this component separately
import eyeOpenIcon from '../assets/eyeopen.svg'; // Import the eye open icon
import eyeClosedIcon from '../assets/eye-closed.svg'; // Import the eye closed icon
import email from '../assets/email.svg';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State for confirm password visibility

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); // Toggle password visibility
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev); // Toggle confirm password visibility
  };

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

const [errorMessage, setErrorMessage] = useState(''); // State for error message

const handleSubmit = (event) => {
  setErrorMessage(''); // Reset error message

    event.preventDefault();
  if (!isLogin && isPasswordVisible && isConfirmPasswordVisible) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  }

  };

  return (
    <div className="auth-container">
      
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <div className="input-container">
          <label htmlFor="email"></label>

          
          <input type="email" placeholder='Email' id="email" required />
          <img 
            src={require('../assets/email.svg').default} 
            alt="Email Icon" 
            className="email-icon" 
          />

          

        </div>

        <div className="input-container">
          <label htmlFor="password"></label>

          <input 
            type={isPasswordVisible ? 'text' : 'password'} 
            placeholder='Password'  
            id="password" 
            required 
          />
          <img 
            src={isPasswordVisible ? eyeOpenIcon : eyeClosedIcon} 
            alt="Toggle Password Visibility" 
            className="eye-icon" 
            onClick={togglePasswordVisibility} 
          />
        </div>

        {!isLogin && (
          <div className="input-container">
          <label htmlFor="confirmPassword"></label>

            <input 
              type={isConfirmPasswordVisible ? 'text' : 'password'} 
              placeholder='Confirm Password'  
              id="confirmPassword" 
              required 
            />
            <img 
              src={isConfirmPasswordVisible ? eyeOpenIcon : eyeClosedIcon} 
              alt="Toggle Confirm Password Visibility" 
              className="eye-icon" 
              onClick={toggleConfirmPasswordVisibility} 
            />
          </div>
        )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className='submit' type="submit">{isLogin ? 'Login' : 'Signup'}</button>



      </form>
    </div>
  );
};

export default Auth;

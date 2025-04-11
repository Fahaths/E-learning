
import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth from AuthContext
import { Link, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported

import './Auth.css'; // Assuming you want to style this component separately

import eyeOpenIcon from '../assets/eyeopen.svg'; // Import the eye open icon
import eyeClosedIcon from '../assets/eye-closed.svg'; // Import the eye closed icon
import emailIcon from '../assets/email.svg';
import profileIcon from '../assets/profile.svg';

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State for confirm password visibility

  const { login, register, loading: isLoading } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); // Toggle password visibility
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev); // Toggle confirm password visibility
  };

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
    setErrorMessage(''); // Reset error message on mode switch
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const username = emailInput;

    // Validate all fields
    if (!emailInput) {
      setErrorMessage('Email is required');
      return;
    }
    if (!isValidEmail(emailInput)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required');
      return;
    }

    setErrorMessage(''); // Reset error message
    setSuccessMessage(''); // Reset success message

    if (!isLogin) {
      const nameInput = document.getElementById('name').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();
      
      if (!nameInput) {
        setErrorMessage('Name is required');
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters');
        return;
      }

      const result = await register(nameInput, emailInput, password);
      if (result.success) {
        setSuccessMessage('Signup successful! Please log in.'); // Display success message
      } else {
        setErrorMessage(result.message); // Set error message on failure
      }

    } else {
      const result = await login(username, password);
      if (result.success) {
        navigate('/dashboard'); // Redirect to dashboard on success
      } else {
        setErrorMessage(result.message); // Set error message on failure
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}> 
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        {!isLogin && (
          <div className="input-container">
            <label htmlFor="name"></label>
            <input type="text" placeholder='Name' id="name" required />
            <img 
              src={profileIcon} 
              alt="Profile Icon" 
              className="email-icon" 
            />
          </div>
        )}

        <div className="input-container">
          <label htmlFor="email"></label>
          <input type="email" placeholder='Email' id="email" required />
          <img 
            src={emailIcon} 
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

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        <button className='submit' type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Signup')}
        </button>
        <Link to="/forgot-password" >Forgot Password?</Link> {/* Ensure this matches the correct route */}
        {successMessage && <p className="success-message" style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message in green */}
      </form>
      <p>
        Don't have an account?{' '}
        <a onClick={toggleAuthMode} href="#">
          {isLogin ? 'Sign up' : 'Login'}
        </a>
      </p>
    </div>
  );
};

export default Auth;

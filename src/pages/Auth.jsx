import React, { useState } from 'react';
import './Auth.css'; // Assuming you want to style this component separately
import { Link } from 'react-router-dom'; // Added import for Link

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

  const validateToken = async () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setErrorMessage('No token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://testlms.measiit.edu.in/wp-json/jwt-auth/v1/token/validate', { // Corrected endpoint
        method: 'POST', // Ensure method matches backend
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Token is valid:', data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Token validation failed.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while validating the token.');
    }
  };

  const fetchEnrolledCourses = async () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setErrorMessage('No token found. Please log in again.');
      return;
    }
  
    try {
      const response = await fetch('https://testlms.measiit.edu.in/wp-json/custom/v1/enrolled-courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Enrolled courses:', data); // Log or handle the enrolled courses as needed
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to fetch enrolled courses.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching enrolled courses.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    if (!isValidEmail(emailInput)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage(''); // Reset error message
    setSuccessMessage(''); // Reset success message

    if (!isLogin) {
      const username = document.getElementById('email').value; // Assuming email is used as username
      const nameInput = document.getElementById('name').value; // Get the name input
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      // Signup request
      try {
        const response = await fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/users/register', { // Corrected endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email: username, password, name: nameInput }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Signup failed. Please ensure the username and email are unique.');
          console.error('Signup error:', errorData);
          return;
        }

        const data = await response.json();
        setSuccessMessage('Signup successful! Please log in with your credentials.');
        console.log('Signup successful:', data);
      } catch (error) {
        setErrorMessage('A network error occurred during signup. Please try again later.');
        console.error('Signup network error:', error);
      }
    } else {
      // Login request
      const username = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('https://testlms.measiit.edu.in/wp-json/jwt-auth/v1/token', { // Corrected endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('jwt_token', data.token); // Store the JWT token in local storage
          setSuccessMessage('Login successful! Redirecting to your dashboard...');
          fetchEnrolledCourses(); // Fetch enrolled courses after login
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Login failed. Please check your credentials.');
        }
      } catch (error) {
        setErrorMessage('A network error occurred during login. Please try again later.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}> 
        {/* Ensure to validate the token before submitting */}
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
        <button className='submit' type="submit">{isLogin ? 'Login' : 'Signup'}</button>
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
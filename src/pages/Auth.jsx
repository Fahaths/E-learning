import React, { useState } from 'react';
import './Auth.css'; // Assuming you want to style this component separately
import eyeOpenIcon from '../assets/eyeopen.svg'; // Import the eye open icon
import eyeClosedIcon from '../assets/eye-closed.svg'; // Import the eye closed icon
import email from '../assets/email.svg';

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
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
    setErrorMessage(''); // Reset error message on mode switch
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    const emailInput = document.getElementById('email').value;
    if (!isValidEmail(emailInput)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage(''); // Reset error message
    event.preventDefault();

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
        console.log('Signup request URL:', 'https://your-wordpress-site.com/wp-json/wp/v2/users/register');
        console.log('Signup request body:', JSON.stringify({ username, email: username, password, name: nameInput }));
        const response = await fetch('https://your-wordpress-site.com/wp-json/wp/v2/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email: username, password, name: nameInput }), // Include name in the signup request
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Signup failed');
          console.error('Signup error:', errorData);
          return;
        }
      } catch (error) {
        setErrorMessage('Network error occurred during signup');
        console.error('Signup network error:', error);
        return;
      }
    } else {
      // Login request
      const username = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        console.log('Login request URL:', 'https://your-wordpress-site.com/wp-json/jwt-auth/v1/token');
        console.log('Login request body:', JSON.stringify({ username, password }));
        const response = await fetch('https://your-wordpress-site.com/wp-json/jwt-auth/v1/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Login failed');
          console.error('Login error:', errorData);
          return;
        }
      } catch (error) {
        setErrorMessage('Network error occurred during login');
        console.error('Login network error:', error);
        return;
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
              src={require('../assets/profile.svg').default} 
              alt="Profile Icon" 
              className="email-icon" 
            />
          </div>
        )}

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

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        <button className='submit' type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        
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

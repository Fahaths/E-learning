import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forgetpassword.css';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://testlms.measiit.edu.in/wp-json/custom/v1/forgot-password', { email });

        setMessage(response.data.message);
    } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred.');
    }
};

  return (
    <div className="forget-password-container">
      <h1>Forgot Password</h1>
      <p>Please enter your email address to receive a verification link.</p>

      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        /> <br />
        <button type="submit">Send Verification Email</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/Auth" className="authlink">Back to Login</Link>
    </div>
  );
}

export default ForgotPassword;

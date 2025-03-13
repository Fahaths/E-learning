import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forgetpassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for password reset logic
    console.log('Reset password for:', email);
    setMessage('If an account with that email exists, a verification link will be sent to your email.');
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

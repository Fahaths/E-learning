import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for password reset logic
    console.log('Reset password for:', email);
    setMessage('If an account with that email exists, a password reset link will be sent.');
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        /> <br />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/login">Back to Login</Link>
    </div>
  );
}

export default ForgotPassword;

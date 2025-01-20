import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div>
      <h1>Forgot Password</h1>
      <form>
        <input type="email" placeholder="Enter your email" /> <br />
        <button type="submit">Reset Password</button>
      </form>
      <Link to="/login">Back to Login</Link>
    </div>
  );
}

export default ForgotPassword;
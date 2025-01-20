import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Full Name" /> <br />
        <input type="email" placeholder="Email" /> <br />
        <input type="password" placeholder="Password" /> <br />
        <input type="password" placeholder=" confirm Password" /> <br />

        
        <button type="submit">Sign Up</button>
      </form>

      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

export default Signup;

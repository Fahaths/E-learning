import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} /> <br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> <br />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

export default Signup;

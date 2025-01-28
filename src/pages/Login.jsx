import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
        <input type="submit" value="Login" />
      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
      <br />
      <Link to="/signup">Don't have an account? Sign Up</Link>
    </div>
  );
}

export default Login;

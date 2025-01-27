import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-actual-wordpress-site.com/wp-json/jwt-auth/v1/token', { // Update this URL
        username: username,
        password: password,
      });
      console.log('Logged in successfully:', response.data);
      // Optionally store the token and redirect the user
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

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

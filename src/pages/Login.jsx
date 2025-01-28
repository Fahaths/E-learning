import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post('/api/login', { email, password });
      alert("Login successful!"); // Use the response for a success message
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have an account? Sign Up</Link>
    </div>
  );
}

export default Login;

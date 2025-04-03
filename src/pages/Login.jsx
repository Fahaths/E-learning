import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth from AuthContext
import axios from 'axios'; // Remove axios import



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-wordpress-site.com/wp-json/jwt-auth/v1/token', { username: email, password });

      if (result.success) {
        navigate('/dashboard'); // Redirect to dashboard on success
      } else {
        setError(result.message); // Set error message on failure

    } catch (err) {
      setError('Login failed. Please check your credentials.'); // Handle error message
      console.error('Login error:', err);

    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        </div>
        <button type="submit">Login</button>
      {error && <div className="error-message">{error}</div>}
      </form>

    </div>
  );
}

export default Login;

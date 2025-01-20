import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <form>
       <label>Username:</label>
       <input type ="text" name="username" /> <br/>
       <label>Password:</label>
       <input type ="pass" name="Password" /> <br />
       <input type ="submit" value="Login"/>

      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
      <br />
      <Link to="/signup">Don't have an account? Sign Up</Link>
    </div>
  );
}

export default Login;
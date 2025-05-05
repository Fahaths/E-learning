import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Dashboard from './components/Dashboard'; // Importing the Dashboard component
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses'; 
import Posts from './components/posts';
import Assingment from './pages/Assingment';
import Auth from './pages/Auth';
import ForgotPassword from './pages/Forgetpassword'; // Importing the Forgot Password component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/dashboard';
import Profile from './components/Profile';


function App() {
  

  return (

    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/auth" element={<Auth />} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </Router>

    </AuthProvider> // Close AuthProvider
  ); // Correctly close the return statement

    <Router>
      <Routes>
        <Route>
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        
          <Route path="profile" element={<Profile />} />
          
       
        <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );

}

export default App;

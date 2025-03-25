import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/dashboard';
import Profile from './components/Profile';

function App() {
  

  return (
    <Router>
      <Routes>
        
          
        
          <Route path="profile" element={<Profile />} />
          
       
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
      </Routes>
    </Router>
  );
}

export default App;
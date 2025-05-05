import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Posts from './components/posts';
import Assingment from './pages/Assingment';
import Auth from './pages/Auth';
import ForgotPassword from './pages/Forgetpassword';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Auth1 from './pages/Auth1';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';



function App() {
 
  

  return (
    
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            
            <Route path='/Auth' element={<Auth1 />} />
            
            <Route 
              path="/dashboard" 
            
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    
  );
}


export default App;

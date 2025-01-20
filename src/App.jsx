import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Assingment from './pages/Assingment';
import Login from './pages/Login';
import ForgotPassword from './pages/Forgetpassword'; // Import ForgotPassword
import Signup from './pages/Signup'; // Import Signup

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assingment" element={<Assingment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add ForgotPassword route */}
          <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
        </Routes>
        <Footer /> 
      </div>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Posts from './components/posts';
import  Assingment from './pages/Assingment'; // Importing the Assignment component
import Auth from './pages/Auth';
import ForgotPassword from './pages/Forgetpassword'; // Importing the Forgot Password component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/assignments" element={<Assingment />} /> {/* Adding route for Assignments */}
        <Route path="/Auth" element={<Auth />} /> {/* Adding route for Login */}
        
      </Routes>
      <br />
      <br /><br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </Router>
  );
}

export default App;

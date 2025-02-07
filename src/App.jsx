import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Posts from './components/posts';
import  Assingment from './pages/Assingment'; // Importing the Assignment component
import Login from './pages/Login'; // Importing the Login component
import Signup from './pages/Signup'; // Importing the Signup component
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
        <Route path="/login" element={<Login />} /> {/* Adding route for Login */}
        <Route path="/signup" element={<Signup />} /> {/* Adding route for Signup */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Adding route for Forgot Password */}
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


import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Dashboard from './components/dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Posts from './components/posts';
import Assingment from './pages/Assingment';
import Auth from './pages/Auth';
import ForgotPassword from './pages/Forgetpassword'; // Importing the Forgot Password component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import EnrolledCourses from './components/EnrolledCourses';
import Wishlist from './components/Wishlist';
import Reviews from './components/Reviews';
import QuizAttempts from './components/QuizAttempts';
import Settings from './components/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <AuthProvider> {/* Wrap the application with AuthProvider inside Router */}
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={
              isAuthenticated ? (
                <Dashboard setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/Auth" />
              )
            }>
              <Route path="profile" element={<Profile />} />
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="quiz-attempts" element={<QuizAttempts />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? (
                  <Profile />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;

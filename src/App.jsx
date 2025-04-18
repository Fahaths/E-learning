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
import ForgotPassword from './pages/Forgetpassword';
import Profile from './components/Profile';
import EnrolledCourses from './components/EnrolledCourses';
import {
  Wishlist,
  Reviews,
  QuizAttempts,
  OrderHistory,
  QnA,
  Settings,
} from './AppImports';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="quiz-attempts" element={<QuizAttempts />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="qna" element={<QnA />} />
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
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

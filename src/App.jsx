import React from 'react'; 
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Dashboard from './components/Dashboard'; // Importing the Dashboard component
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses'; 
import Posts from './components/posts';
import Assingment from './pages/Assingment'; // Importing the Assignment component
import Auth from './pages/Auth';
import ForgotPassword from './pages/Forgetpassword'; // Importing the Forgot Password component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
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
}

export default App;

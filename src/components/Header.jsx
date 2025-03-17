import React, { useState } from 'react';
import searchIcon from '../assets/search.svg'; // Import the search icon
import { Link } from 'react-router-dom';
import './header.css';
import Auth from '../pages/Auth';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false); // State for search bar visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const isLoggedIn = !!localStorage.getItem('jwt_token'); // Check if the user is logged in

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible); // Toggle search bar visibility
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">E-Learning</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/auth">Login/Signup</Link></li>
            
            {isLoggedIn && (
              <li><Link to="/dashboard" className="dashboard-button">Dashboard</Link></li>
            )}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          
          <button className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={() => setIsMenuOpen(false)}>×</button>
            <ul>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/courses" onClick={() => setIsMenuOpen(false)}>Courses</Link></li>
              <li><Link to="/auth" onClick={() => setIsMenuOpen(false)}>Login/Signup</Link></li>  
              {isLoggedIn && (
              <li><Link to="/dashboard" className="dashboard-button">Dashboard</Link></li>
              )}
            </ul>
            {/* Search Bar */}
            <div className="search-bar-container">
              
              {isSearchBarVisible && (
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

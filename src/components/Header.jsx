import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';


function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

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
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/Assignment">Assignment</Link></li>
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          <button className="hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
              <li><Link to="/courses" onClick={toggleMobileMenu}>Courses</Link></li>
              <li><Link to="/about" onClick={toggleMobileMenu}>About</Link></li>
              <li><Link to="/contact" onClick={toggleMobileMenu}>Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

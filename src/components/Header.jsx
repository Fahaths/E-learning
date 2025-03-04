import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Auth from '../pages/Auth';

function Header() {
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

          </ul>
        </nav>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          <button className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="mobile-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

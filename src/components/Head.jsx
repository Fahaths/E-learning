import React from 'react';
import { Link } from 'react-router-dom';
import './Head.css';

const Head = () => {
  return (
    <header>
      <h1>SF</h1>
      <p>Hello, S Fahath</p>
      <nav>
        <ul>
          <li>My Profile</li>
          <li>Enrolled Courses</li>
          <li>Wishlist</li>
          <li>Reviews</li>
          <li>My Quiz Attempts</li>
          <li>Order History</li>
          <li>Question & Answer</li>
        </ul>
      </nav>
      <button>Set Your Profile Photo</button>
    </header>
  );
};

export default Head;
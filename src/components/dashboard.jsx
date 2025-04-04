import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const handleLogout = () => {
    // Add logout logic here
    console.log('User logged out');
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <h2>Dashboard</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="profile">My Profile</Link></li>
          <li><Link to="enrolled-courses">Enrolled Courses</Link></li>
          <li><Link to="wishlist">Wishlist</Link></li>
          <li><Link to="reviews">Reviews</Link></li>
          <li><Link to="quiz-attempts">My Quiz Attempts</Link></li>
          <li><Link to="order-history">Order History</Link></li>
          <li><Link to="qna">Question & Answer</Link></li>
          <li><Link to="settings">Settings</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;
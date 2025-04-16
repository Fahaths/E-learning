import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    // Add logout logic here
    console.log('User logged out');
  };

  useEffect(() => {
    // Fetch menu items from WordPress REST API
fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/menu') // Replace with actual WordPress API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <h2>Dashboard</h2>
        {loading && <p>Loading menu...</p>}
        {error && <p>Error loading menu: {error}</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {!loading && !error && menuItems.length > 0 ? (
            menuItems.map((item) => (
              <li key={item.id}>
                <Link to={item.url}>{item.title.rendered}</Link>
              </li>
            ))
          ) : (
            <>
              <li><Link to="profile">My Profile</Link></li>
              <li><Link to="enrolled-courses">Enrolled Courses</Link></li>
              <li><Link to="wishlist">Wishlist</Link></li>
              <li><Link to="reviews">Reviews</Link></li>
              <li><Link to="quiz-attempts">My Quiz Attempts</Link></li>
              <li><Link to="order-history">Order History</Link></li>
              <li><Link to="qna">Question & Answer</Link></li>
              <li><Link to="settings">Settings</Link></li>
            </>
          )}
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

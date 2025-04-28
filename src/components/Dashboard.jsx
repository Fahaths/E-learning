import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Dashboard.css';
import { API_BASE_URL, MENU_ID } from '../config';

import EnrolledCourses from './EnrolledCourses';
import Settings from './Settings';
import Wishlist from './Wishlist';
import QuizAttempts from './QuizAttempts';
import Reviews from './Reviews';

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('jwt_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(`${API_BASE_URL}/menu-items?menus=${MENU_ID}`, { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        console.log('Fetched menu items:', data);
        if (!data || data.length === 0) {
          setError('No menu items found in the WordPress menu.');
        }
        setMenuItems(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Dashboard</h2>
        </div>
        <nav className="nav">
          {/* Static links to other components */}
          <Link to="/dashboard/enrolled-courses" className="nav-link">Enrolled Courses</Link>
          <Link to="/dashboard/settings" className="nav-link">Settings</Link>
          <Link to="/dashboard/wishlist" className="nav-link">Wishlist</Link>
          <Link to="/dashboard/quiz-attempts" className="nav-link">Quiz Attempts</Link>
          <Link to="/dashboard/reviews" className="nav-link">Reviews</Link>

          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="Dashboard-header">
          <h1 className="header-title">Welcome to Your Dashboard</h1>
          <p className="header-subtitle">Here is an overview of your learning activities.</p>
        </header>

        {/* Dashboard sections like stats, in-progress courses, recent activities can be added here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Dashboard.css';
import { API_BASE_URL, MENU_ID } from '../config';
import axios from 'axios';

import EnrolledCourses from './EnrolledCourses';
import Settings from './Settings';
import Wishlist from './Wishlist';
import QuizAttempts from './QuizAttempts';
import Reviews from './Reviews';
import Profile from './Profile';

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const { user, logout } = useAuth();
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
        const response = await axios.get(`${API_BASE_URL}/menu-items?menus=${MENU_ID}`, { headers });
        if (response.status !== 200) {
          throw new Error('Failed to fetch menu items');
        }
        const data = response.data;
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

    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${API_BASE_URL}/users/me`, { headers });
        if (response.status === 200) {
          const avatarUrls = response.data.avatar_urls;
          if (avatarUrls && avatarUrls['96']) {
            setAvatarUrl(avatarUrls['96']);
          } else if (response.data.avatar_url) {
            setAvatarUrl(response.data.avatar_url);
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile image:', err);
      }
    };

    fetchMenuItems();
    fetchProfileImage();
  }, []);

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="profile-image"
              style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }}
            />
          ) : (
            <div className="profile-image-placeholder" style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ccc', marginBottom: '10px' }} />
          )}
          <h2 className="sidebar-title">Dashboard</h2>
        </div>
        <nav className="nav">
          {menuItems.length > 0 ? (
            menuItems.map(item => (
              <a
                key={item.id}
                href={item.url}
                className="nav-link"
                target={item.target || '_self'}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              >
                {item.title}
              </a>
            ))
          ) : (
            <>
              <Link to="/dashboard/profile" className="nav-link">Profile</Link>
              <Link to="/dashboard/enrolled-courses" className="nav-link">Enrolled Courses</Link>
              <Link to="/dashboard/settings" className="nav-link">Settings</Link>
              <Link to="/dashboard/wishlist" className="nav-link">Wishlist</Link>
              <Link to="/dashboard/quiz-attempts" className="nav-link">Quiz Attempts</Link>
              <Link to="/dashboard/reviews" className="nav-link">Reviews</Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="Dashboard-header">
          <h1 className="header-title">Welcome to Your Dashboard</h1>
          <p className="header-subtitle">Here is an overview of your learning activities.</p>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

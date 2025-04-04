import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myprofile');

  const subModules = [
    { id: 'myprofile', name: 'My Profile' },
    { id: 'wishlist', name: 'Wishlist' },
    { id: 'courses', name: 'My Courses' },
    { id: 'progress', name: 'Learning Progress' },
    { id: 'certificates', name: 'Certificates' },
    { id: 'settings', name: 'Account Settings' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            {subModules.map((module) => (
              <li 
                key={module.id}
                className={activeTab === module.id ? 'active' : ''}
                onClick={() => setActiveTab(module.id)}
              >
                {module.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

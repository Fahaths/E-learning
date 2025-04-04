import React from 'react';
import '../App.css';

const MyProfile = () => {
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-content">
        <div className="profile-info">
          <div className="avatar">Profile Picture</div>
          <div className="details">
            <p>Name: John Doe</p>
            <p>Email: john@example.com</p>
            <p>Joined: January 2023</p>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn-primary">Edit Profile</button>
          <button className="btn-secondary">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

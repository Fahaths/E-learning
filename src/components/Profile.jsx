import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setError('User not authenticated. Please login.');
      setLoading(false);
      return;
    }

    fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error}</p>;

  return (
    <div>
      <h1>My Profile</h1>
      {profile && (
        <div>
          <p><strong>Username:</strong> {profile.slug}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email || 'Not available'}</p>
          <p><strong>Description:</strong> {profile.description || 'No description'}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;

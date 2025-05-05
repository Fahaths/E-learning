import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../AuthContext';

const PROFILE_API_ENDPOINT = '/users/me'; // Default endpoint, can be changed to custom endpoint

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const response = await axios.get(`${API_BASE_URL}${PROFILE_API_ENDPOINT}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;

        // Map data fields as needed; adjust based on actual API response structure
        const profileData = {
          name: data.name || '',
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          username: data.slug || data.username || '',
          email: data.email || data.user_email || '',
          phoneNumber: data.phone_number || data.phone || '',
          skill: data.skill || data.occupation || '',
          biography: data.description || data.biography || '',
          enrollment: data.enrollment_number || '',
          course: data.course || '',
          registrationDate: data.registered_date || data.registration_date || '',
        };

        setProfile(profileData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data');
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-item"><strong>First Name:</strong> {profile.firstName}</div>
      <div className="profile-item"><strong>Last Name:</strong> {profile.lastName}</div>
      <div className="profile-item"><strong>Username:</strong> {profile.username}</div>
      <div className="profile-item"><strong>Email:</strong> {profile.email}</div>
      <div className="profile-item"><strong>Phone Number:</strong> {profile.phoneNumber}</div>
      <div className="profile-item"><strong>Skill/Occupation:</strong> {profile.skill}</div>
      <div className="profile-item"><strong>Biography:</strong> {profile.biography}</div>
      <div className="profile-item"><strong>Registration Date:</strong> {profile.registrationDate}</div>
      <div className="profile-item"><strong>Enrollment Number:</strong> {profile.enrollment}</div>
      <div className="profile-item"><strong>Course:</strong> {profile.course}</div>
    </div>
  );
};

export default Profile;

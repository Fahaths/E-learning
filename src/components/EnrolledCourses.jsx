import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { API_BASE_URL } from '../config';
import './EnrolledCourses.css';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('enrolled'); // example for tab switching

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${API_BASE_URL}/courses`, { headers });
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses from WordPress');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  const filteredCourses = activeTab === 'enrolled'
    ? courses // Add real enrolled filter here if needed
    : courses; // could be different if you have "All" vs "Enrolled"

  return (
    <div className="courses-container">
      <h2>Enrolled Courses</h2>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'enrolled' ? 'active' : ''}`}
          onClick={() => setActiveTab('enrolled')}
        >
          Enrolled
        </div>
        <div
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredCourses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              {course.featured_image_url && (
                <img
                  src={course.featured_image_url}
                  alt={course.title.rendered}
                  className="course-image"
                />
              )}
              <div className="course-details">
                <div className="stars">⭐⭐⭐⭐☆</div> {/* You can improve dynamic stars later */}
                <h3 className="course-title">{course.title.rendered}</h3>
                <div className="progress-text">Progress: 50%</div> {/* Static or dynamic */}
                <div className="progress-bar">
                  <div className="progress" style={{ width: '50%' }}></div> {/* Adjust width dynamically */}
                </div>
                <button className="continue-button">Continue</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;

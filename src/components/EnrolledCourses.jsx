import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { API_BASE_URL, MENU_ID } from '../config';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Updated WordPress Core REST API endpoint for enrolled courses menu items
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${API_BASE_URL}/menu-items?menus=${MENU_ID}`, { headers });
        // Assuming the courses are in response.data
        setCourses(response.data || []);
      } catch (err) {
        setError('Failed to fetch courses from WordPress');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading enrolled courses...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      <h2 className="enrolled-courses-title">Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p>No enrolled courses found.</p>
      ) : (
        <ul className="courses-list">
          {courses.map((course) => (
            <li key={course.ID} className="course-item">
              <h3 className="course-title">{course.title}</h3>
              {/* Assuming course has a description or excerpt */}
              {course.description && (
                <div
                  className="course-description"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnrolledCourses;

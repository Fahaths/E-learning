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
        const response = await axios.get(`${API_BASE_URL}/courses?_embed`, { headers });
        console.log('Fetched courses data:', response.data);
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
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
    : activeTab === 'Active'
    ? courses.filter(course => (course.progress || 0) > 0 && (course.progress || 0) < 100)
    : activeTab === 'Completed'
    ? courses.filter(course => (course.progress || 0) >= 100)
    : courses; // could be different if you have "All" vs "Enrolled"

  return (
    <div className="courses-container">
      <h2>Enrolled Courses</h2>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'Enrolled' ? 'active' : ''}`}
          onClick={() => setActiveTab('Enrolled')}
        >
          Enrolled
        </div>
        <div
          className={`tab ${activeTab === 'Active' ? 'active' : ''}`}
          onClick={() => setActiveTab('Active')}
        >
          Active
        </div>
        <div
          className={`tab ${activeTab === 'Completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('Completed')}
        >
          Completed
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredCourses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          filteredCourses.map(course => {
            if(course.slug === 'check') {
              console.log('Check course progress:', course.progress);
            }
            console.log('Course object:', course);
            const featuredMedia = course._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            return (
              <div key={course.id} className="course-card">
                <div className="course-details">
                  {featuredMedia ? (
                    <img
                      src={featuredMedia}
                      alt={course.title.rendered}
                      className="course-image"
                    />
                  ) : course.featured_image_url ? (
                    <img
                      src={course.featured_image_url}
                      alt={course.title.rendered}
                      className="course-image"
                    />
                  ) : null}
                  <div className="stars">
                    {Array.from({ length: 5 }, (_, i) => {
                      const rating = course.rating || 3; // default rating 4
                      const fullStar = '⭐';
                      const halfStar = '⯨'; // or use another half star character
                      const emptyStar = '☆';
                      if (rating >= i + 1) {
                        return <span key={i}>{fullStar}</span>;
                      } else if (rating > i && rating < i + 1) {
                        return <span key={i}>{halfStar}</span>;
                      } else {
                        return <span key={i}>{emptyStar}</span>;
                      }
                    })}
                  </div>
                  <h3 className="course-title">{course.title.rendered}</h3>
                  <div className="progress-text">Progress: {course.progress ?? 50}%</div>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${course.progress ?? 50}%` }}></div>
                  </div>
                  <a
                    href={`https://testlms.measiit.edu.in/courses/${course.slug}`}
                    rel="noopener noreferrer"
                    className="continue-button"
                    onClick={() => console.log(course.slug)}
                  >
                    Continue
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;

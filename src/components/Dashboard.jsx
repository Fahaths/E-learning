import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [courses, setCourses] = useState([]); // State for enrolled courses
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setErrorMessage('No token found. Please log in again.');
      window.location.href = '/login'; // Redirect to login page
      return;
    }
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setErrorMessage('No token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://testlms.measiit.edu.in/wp-json/custom/v1/enrolled-courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched courses:', data); // Debugging log
        setCourses(data); // Corrected line
      } else {
        const errorData = await response.json();
        console.error('Error fetching courses:', errorData); // Debugging log
        setErrorMessage(errorData.message || 'Failed to fetch courses.');
      }
    } catch (error) {
      console.error('Network error while fetching courses:', error); // Debugging log
      setErrorMessage('An error occurred while fetching courses.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-pic">SF</div>
          <div className="profile-info">
            <h2>Hello, S Fahath</h2>
            <button className="profile-photo-btn">Set Your Profile Photo</button>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/enrolled-courses">Enrolled Courses</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/quiz-attempts">My Quiz Attempts</Link></li>
            <li><Link to="/order-history">Order History</Link></li>
            <li><Link to="/questions-answers">Question & Answer</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <h2 className="heading">Dashboard</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if any */}
        <section className="courses-section">
          <h3>In Progress Courses</h3>
          {courses.length === 0 && !errorMessage && (
            <p>No courses found. Please enroll in a course to see it here.</p>
          )}
          <div className="course-card">
            {courses.map(course => (
              <div key={course.id} className="course-item">
                <img src={course.image} alt={course.title} className="course-image" />
                <div className="course-details">
                  <div className="course-rating">
                    {'★'.repeat(course.rating)} {course.rating.toFixed(2)}
                  </div>
                  <h4>{course.title}</h4>
                  <p>Completed Lessons: {course.completedLessons} of {course.totalLessons} lessons</p>
                  <div className="course-progress">
                    <div className="progress-bar" style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}></div>
                    <span>{((course.completedLessons / course.totalLessons) * 100).toFixed(0)}% Complete</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

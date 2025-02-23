import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import DOMPurify from 'dompurify';
import './Courses.css';

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://testlms.measiit.edu.in/wp-json/wp/v2/courses?categories=react&per_page=3&_embed');

        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          setError('Unexpected data format received from server');
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        setError(`Failed to fetch courses: ${error.message || 'Network error'}`);
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Welcome to Measi E-learning Website</h1>
      <nav>
        <ul>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/assignments">Assignments</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
      <div className="courses-container">
        <h2>Featured React Courses</h2>
        <p className="featured-description">Get started with these top React.js courses</p>

        {loading && <div className="loading-spinner">Loading courses...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && (
          <ul className="courses-list">
            {courses.map(course => (
              <li key={course.id} className="course-card">
                <div className="course-media react-course">
                  {course.video_url ? (
                    <ReactPlayer
                      url={course.video_url}
                      controls
                      width="100%"
                      height="auto"
                      className="course-video"
                    />
                  ) : course.featured_media_url ? (
                    <img src={course.featured_media_url} alt={course.title.rendered || 'Course'} />
                  ) : (
                    <img 
                      src="/images/course-placeholder.jpg" 
                      alt="Course placeholder" 
                      className="placeholder-image"
                    />
                  )}
                </div>
                
                <div className="course-content">
                  <h2>{course.title.rendered || 'No title available'}</h2>
                  {course.content.rendered ? (
                    <div 
                      className="course-description"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.content.rendered) }} 
                    />
                  ) : (
                    <p>No content available</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from './dashboard';
import axios from 'axios';
import ReactPlayer from 'react-player';
import DOMPurify from 'dompurify';
import './Courses.css';

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

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
    <div className="home-container">
      <h1 className='heading'>Welcome to Measi E-learning Website</h1>
      
      {currentUser ? (
        <div className="dashboard-layout">
          <Dashboard />
          <div className="courses-container">
            <h2>Featured Courses</h2>
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
      ) : (
        <div className="courses-container">
          <h2>Featured Courses</h2>
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
      )}
    </div>
  );
}

export default Home;

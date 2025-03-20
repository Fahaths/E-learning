import React, { useEffect, useState } from 'react';
import Auth from './Auth'; // Import the Auth component

import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import DOMPurify from 'dompurify';
import './Courses.css';

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      <h1 className='heading' style={{ textAlign: 'center', marginBottom: '5px' }}>Welcome to Measi E-learning Website</h1>
      <div className="search-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10rem' }}>

        <input 

          type="text" 
          placeholder="Search courses..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
          style={{  marginBottom: '10rem' }}
        />
        
      </div>

      <div className="courses-container">
        <h2>Featured Courses</h2>
       
{loading && (
    <div className="loading-spinner">
      <span className="visually-hidden">Loading...</span>
    </div>
)}



        {error && <div className="error-message">{error}</div>}
        {!loading && !error && (
          <ul className="courses-list">
            {courses.filter(course => 
              course.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(course => (

              <li key={course.id} className="course-card">
                <Link to={course.link}>
                
                <div className="course-media react-course">
                  {course.video_url ? ( 
                    <ReactPlayer
                      url={course.video_url}
                      controls
                      width="100%"
                      height="auto"
                      className="course-video"
                    />
                  ) : (
                    <img 
                      src={course.featured_media_url || "/images/course-placeholder.jpg"} 
                      alt={course.title.rendered || 'Course'} 
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      
    </div>
  );
  
}

export default Home;

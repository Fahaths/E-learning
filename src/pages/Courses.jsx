import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './Courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://testlms.measiit.edu.in/wp-json/wp/v2/courses?categories=react&_embed');

        if (Array.isArray(response.data)) {
          const coursesWithMedia = response.data.map(course => {
            let featuredMediaUrl = '';
            if (course._embedded && course._embedded['wp:featuredmedia'] && course._embedded['wp:featuredmedia'][0]) {
              featuredMediaUrl = course._embedded['wp:featuredmedia'][0].source_url || '';
            }
            return {
              ...course,
              featured_media_url: featuredMediaUrl
            };
          });
          setCourses(coursesWithMedia);
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

  const sortedCourses = [...courses].sort((a, b) => {
    if (selectedSort === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (selectedSort === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (selectedSort === 'title-asc') {
      return a.title.rendered.localeCompare(b.title.rendered);
    } else if (selectedSort === 'title-desc') {
      return b.title.rendered.localeCompare(a.title.rendered);
    }
    return 0;
  });

  return (
    <div className="courses-container">
      <h1>All Courses</h1>
      <select 
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
        className="sort-dropdown"
      >
        <option value="newest">Release Date (newest first)</option>
        <option value="oldest">Release Date (oldest first)</option>
        <option value="title-asc">Course Title (a-z)</option>
        <option value="title-desc">Course Title (z-a)</option>
      </select>
      <input 
        type="text" 
        placeholder="Search courses..." 
        onChange={(e) => {
          setSearchTerm(e.target.value);
          clearTimeout(debounceTimeout.current);
          debounceTimeout.current = setTimeout(() => {
            setSearchTerm(e.target.value);
          }, 300);
        }} 
        className="search-bar"
      />

      {loading && <div className="loading-spinner">Loading courses...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && (
        <ul className="courses-list">
          {sortedCourses.filter(course => 
            course.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((course) => (
            <li key={course.id} className="course-card">
              <div className="course-media react-course">
                {course.video_url ? (
                  <div className="video-wrapper">
                    <ReactPlayer
                      url={course.video_url}
                      controls
                      width="100%"
                      height="auto"
                      className="course-video"
                      onError={(e) => console.error('Video player error:', e)}
                      loading="lazy"
                    />
                  </div>
                ) : course.featured_media_url ? (
                  <a href={`https://testlms.measiit.edu.in/courses/${course.slug}`} rel="noopener noreferrer">
                    <img 
                      src={course.featured_media_url}
                      alt={course.title.rendered || 'Course thumbnail'}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/course-placeholder.jpg';
                        e.target.alt = 'Course placeholder';
                      }}
                      onLoad={(e) => {
                        const img = e.target;
                        if (img.naturalWidth > 300) {
                          img.src = img.src.replace(/-\d+x\d+\./, '-300x169.');
                        }
                      }}
                    />
                  </a>
                ) : (
                  <a href={`https://testlms.measiit.edu.in/courses/${course.slug}`} rel="noopener noreferrer" onClick={() => console.log(course.slug)}>
                    <img 
                      src="/images/course-placeholder.jpg" 
                      alt="Course placeholder" 
                      className="placeholder-image"
                    />
                  </a>
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
  );
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.shape({
        rendered: PropTypes.string
      }).isRequired,
      content: PropTypes.shape({
        rendered: PropTypes.string
      }),
      video_url: PropTypes.string,
      featured_media_url: PropTypes.string,
      slug: PropTypes.string
    })
  )
};

export default Courses;

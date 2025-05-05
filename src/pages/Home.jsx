import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ReactPlayer from 'react-player';
import DOMPurify from 'dompurify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Courses.css';
import './Search.css';

import slider1 from './slider1.jpg';
import slider2 from './slider2.jpg';
import slider3 from './slider3.jpg';

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

  return (
    <div>
      {/* Header Section with Background */}
      <div className="header-section" style={{
        background: 'linear-gradient(135deg,rgb(154, 13, 13) 0%,rgb(115, 4, 4) 100%)',
        padding: '3rem 1rem 4rem',
        color: 'white',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Optional decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)'
        }}></div>
        
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '1.5rem',
          fontSize: '2.5rem',
          fontWeight: '600',
          position: 'relative',
          zIndex: 1
        }}>
          Welcome to Measi E-learning Platform
        </h1>
        
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 1rem',
          position: 'relative',
          zIndex: 1
        }}>
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ 
              width: '100%',
              padding: '0.8rem 1.5rem',
              borderRadius: '25px',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* Bootstrap Carousel */}
      <div id="carouselExample" className="carousel slide mb-5" data-bs-ride="carousel" style={{
        maxWidth: '1200px',
        margin: '0 auto 3rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <div className="carousel-inner" style={{ borderRadius: '8px' }}>
          <div className="carousel-item active">
            <img 
              src={slider1} 
              className="d-block w-100" 
              alt="Education slide 1"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="carousel-caption d-none d-md-block" style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '5px' }}>
              <h5>Quality Education</h5>
              <p>Learn from the best instructors in the industry</p>
            </div>
          </div>
          <div className="carousel-item">
            <img 
              src={slider2} 
              className="d-block w-100" 
              alt="Education slide 2"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="carousel-caption d-none d-md-block" style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '5px' }}>
              <h5>Flexible Learning</h5>
              <p>Study at your own pace, anytime, anywhere</p>
            </div>
          </div>
          <div className="carousel-item">
            <img 
              src={slider3} 
              className="d-block w-100" 
              alt="Education slide 3"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="carousel-caption d-none d-md-block" style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '5px' }}>
              <h5>Cutting-edge Technology</h5>
              <p>Access the latest tools and resources</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Courses Container */}
      <div className="courses-container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '1.5rem',
          color: '#333',
          textAlign: 'center'
        }}>Featured Courses</h2>
       
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '5px solid #f3f3f3',
              borderTop: '5px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        )}

        {error && <div style={{
          color: '#e74c3c',
          textAlign: 'center',
          padding: '1rem',
          background: '#fde8e8',
          borderRadius: '5px',
          margin: '1rem 0'
        }}>{error}</div>}

        {!loading && !error && (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {courses.filter(course => 
              course.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(course => (
              <li key={course.id} style={{
                background: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                }
              }}>
                <div style={{
                  height: '200px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {course.video_url ? ( 
                    <div style={{
                      position: 'relative',
                      paddingTop: '56.25%' /* 16:9 Aspect Ratio */
                    }}>
                      <ReactPlayer
                        url={course.video_url}
                        controls
                        width="100%"
                        height="100%"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                        onError={(e) => console.error('Video player error:', e)}
                      />
                    </div>
                  ) : (
                    <a href={`https://testlms.measiit.edu.in/courses/${course.slug}`} target="_blank" rel="noopener noreferrer" style={{
                      display: 'block',
                      height: '100%'
                    }}>
                      <img 
                        src={course.featured_media_url || '/images/course-placeholder.jpg'}
                        alt={course.title.rendered || 'Course thumbnail'}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onError={(e) => {
                          e.target.src = '/images/course-placeholder.jpg';
                        }}
                      />
                    </a>
                  )}
                </div>
                <div style={{
                  padding: '1.5rem'
                }}>
                  <h2 style={{
                    marginTop: 0,
                    marginBottom: '0.5rem',
                    fontSize: '1.3rem',
                    color: '#2c3e50'
                  }}>
                    <a href={`https://testlms.measiit.edu.in/courses/${course.slug}`} target="_blank" rel="noopener noreferrer" style={{
                      color: 'inherit',
                      textDecoration: 'none'
                    }}>
                      {course.title.rendered || 'No title available'}
                    </a>
                  </h2>
                  {course.content.rendered ? (
                    <div 
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        color: '#666'
                      }}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.content.rendered) }} 
                    />
                  ) : (
                    <p style={{
                      color: '#999',
                      fontStyle: 'italic'
                    }}>No content available</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add some global styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Home;

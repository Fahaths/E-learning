import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://testlms.measiit.edu.in/wp-json/wp/v2/courses?slug=${slug}&_embed`);
        if (response.data && response.data.length > 0) {
          setCourse(response.data[0]);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        setError('Failed to fetch course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) {
    return <div>Loading course details...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      <h1>{course.title.rendered}</h1>
      {course._embedded && course._embedded['wp:featuredmedia'] && course._embedded['wp:featuredmedia'][0] && (
        <img
          src={course._embedded['wp:featuredmedia'][0].source_url}
          alt={course.title.rendered}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
        />
      )}
      <div
        style={{ marginTop: '1rem', lineHeight: '1.6' }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.content.rendered) }}
      />
    </div>
  );
};

export default CourseDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
<<<<<<< HEAD
=======
import ReactPlayer from 'react-player';
import { API_BASE_URL } from '../config';
import './CourseDetail.css';
>>>>>>> a80528c29ea6b736eb5b016f97666eb3aa19108e

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
<<<<<<< HEAD
        const response = await axios.get(`https://testlms.measiit.edu.in/wp-json/wp/v2/courses?slug=${slug}&_embed`);
=======
        const response = await axios.get(`${API_BASE_URL}/courses?slug=${slug}&_embed`);
>>>>>>> a80528c29ea6b736eb5b016f97666eb3aa19108e
        if (response.data && response.data.length > 0) {
          setCourse(response.data[0]);
        } else {
          setError('Course not found');
        }
      } catch (err) {
<<<<<<< HEAD
        setError('Failed to fetch course data');
=======
        setError('Failed to fetch course details');
>>>>>>> a80528c29ea6b736eb5b016f97666eb3aa19108e
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD

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
=======
    fetchCourse();
  }, [slug]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return null;

  const featuredMedia = course._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <div className="course-detail-container">
      <h1>{course.title.rendered}</h1>
      {featuredMedia ? (
        <img src={featuredMedia} alt={course.title.rendered} className="course-detail-image" />
      ) : course.video_url ? (
        <ReactPlayer url={course.video_url} controls width="100%" />
      ) : null}
      <div
        className="course-detail-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.content.rendered) }}
      />
      {/* Additional course info and enrollment status can be added here */}
>>>>>>> a80528c29ea6b736eb5b016f97666eb3aa19108e
    </div>
  );
};

export default CourseDetail;

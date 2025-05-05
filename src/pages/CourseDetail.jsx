import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import ReactPlayer from 'react-player';
import { API_BASE_URL } from '../config';
import './CourseDetail.css';

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
        const response = await axios.get(`${API_BASE_URL}/courses?slug=${slug}&_embed`);
        if (response.data && response.data.length > 0) {
          setCourse(response.data[0]);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        setError('Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };
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
    </div>
  );
};

export default CourseDetail;

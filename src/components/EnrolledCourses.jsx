import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your WordPress REST API endpoint for enrolled courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://your-wordpress-site.com/wp-json/wp/v2/courses');
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses from WordPress');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading enrolled courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p>No enrolled courses found.</p>
      ) : (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              <h3>{course.title.rendered}</h3>
              <div dangerouslySetInnerHTML={{ __html: course.excerpt.rendered }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnrolledCourses;

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://testlms.measiit.edu.in/wp-json/wp/v2/courses');
        console.log('Fetched courses:', response.data); // Log the response

        // Check if the response contains the expected data structure
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.featured_media_url ? (
              <img src={course.featured_media_url} alt="Course" />
            ) : (
              <img src="placeholder-image-url.jpg" alt="Placeholder" /> // Placeholder image
            )}
            <h2>{course.title.rendered || 'No title available'}</h2>

            {course.content.rendered ? (
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.content.rendered) }} />
            ) : (
              <p>No content available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;

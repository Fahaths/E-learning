import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://your-actual-wordpress-site.com/wp-json/wp/v2/courses'); // Update this URL

        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>The Available Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h2>{course.title.rendered}</h2>
            <p>{course.content.rendered}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;

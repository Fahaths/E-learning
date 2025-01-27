import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://testlms.measiit.edu.in/wp-json/wp/v2/courses');
        console.log(response.data); // Log the response data
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
            <p dangerouslySetInnerHTML={{ __html: course.content.rendered }} /> {/* Render HTML safely */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;

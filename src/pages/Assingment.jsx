import React, { useEffect, useState } from 'react';
import axios from 'axios';


const assignments = [
  { title: 'Assignment 1', description: 'Description for Assignment 1', dueDate: '2023-10-15' },
  { title: 'Assignment 2', description: 'Description for Assignment 2', dueDate: '2023-10-22' },
];

function Assingment() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('https://testlms.measiit.edu.in/wp-json/wp/v2/assignments');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <h1>Assignments</h1>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <h2>{assignment.title.rendered}</h2>
            <p dangerouslySetInnerHTML={{ __html: assignment.content.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Assingment;

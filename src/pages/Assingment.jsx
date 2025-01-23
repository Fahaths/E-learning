import React from 'react';

const assignments = [
  { title: 'Assignment 1', description: 'Description for Assignment 1', dueDate: '2023-10-15' },
  { title: 'Assignment 2', description: 'Description for Assignment 2', dueDate: '2023-10-22' },
];

function Assingment() {
  return (
    <div>
      <h1>Assignments</h1>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index}>
            <h2>{assignment.title}</h2>
            <p>{assignment.description}</p>
            <p>Due Date: {assignment.dueDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assingment;

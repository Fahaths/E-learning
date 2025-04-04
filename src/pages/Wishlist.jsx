import React from 'react';
import '../App.css';

const Wishlist = () => {
  const courses = [
    { id: 1, title: 'Advanced React', instructor: 'Jane Smith', price: '$49.99' },
    { id: 2, title: 'Node.js Fundamentals', instructor: 'John Doe', price: '$39.99' },
    { id: 3, title: 'Modern JavaScript', instructor: 'Alex Johnson', price: '$29.99' }
  ];

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <div className="wishlist-items">
        {courses.map(course => (
          <div key={course.id} className="wishlist-item">
            <h3>{course.title}</h3>
            <p>Instructor: {course.instructor}</p>
            <p>Price: {course.price}</p>
            <div className="wishlist-actions">
              <button className="btn-primary">Enroll Now</button>
              <button className="btn-secondary">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

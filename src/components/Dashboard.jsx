import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Head from './Head'; // Importing the Head component

const Dashboard = () => {
  const [courses, setCourses] = useState([]); // State for enrolled courses
  const [orders, setOrders] = useState([]); // State for order history
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchOrders();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <Head /> {/* Include the Head component */}
      <h2>Dashboard</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if any */}
      <section>
        <h3>Enrolled Courses</h3>
        <ul>
          {courses.map(course => (
            <li key={course.id}>{course.title.rendered}</li>
          ))}
        </ul>
      </section>


  return (
    <div>
      <h2>Dashboard</h2>
      <section>
        <h3>Enrolled Courses</h3>
        <ul>
          {courses.map(course => (
            <li key={course.id}>{course.title.rendered}</li>
          ))}

        </ul>
      </section>
      <section>
        <h3>Order History</h3>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Enrolled</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.course_name}</td>
                <td>{order.enrolled ? 'Yes' : 'No'}</td>
                <td>{'★'.repeat(order.rating)}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </section>
      <section>
        <h3>Settings</h3>
        <button>Logout</button>
      </section>
    </div>
  );
};

export default Dashboard;

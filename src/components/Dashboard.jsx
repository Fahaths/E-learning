import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <section>
        <h3>Enrolled Courses</h3>
        <ul>
          <li>Active Courses</li>
          <li>Completed Courses</li>
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
            <tr>
              <td>Python</td>
              <td>0</td>
              <td>☆☆☆☆☆</td>
            </tr>
            <tr>
              <td>Check</td>
              <td>0</td>
              <td>★★★★☆</td>
            </tr>
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
import React from 'react';
import Head from './Head'; // Adjust the path to your Header component
import Dashboard from './Dashboard'; // Adjust the path to your Dashboard component

const StudentDashboardPage = () => {
  return (
    <div>
      <Head userName="S Fahath" /> {/* Pass the user's name as a prop if needed */}
      <Dashboard />
    </div>
  );
};

export default StudentDashboardPage;
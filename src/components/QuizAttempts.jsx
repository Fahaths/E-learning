import React, { useEffect, useState } from 'react';

const QuizAttempts = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/quiz_attempts') // Replace with actual endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quiz attempts');
        }
        return response.json();
      })
      .then((data) => {
        setAttempts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading quiz attempts...</p>;
  if (error) return <p>Error loading quiz attempts: {error}</p>;

  return (
    <div>
      <h1>Quiz Attempts</h1>
      <ul>
        {attempts.map((attempt) => (
          <li key={attempt.id}>{attempt.title?.rendered || attempt.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizAttempts;

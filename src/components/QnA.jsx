import React, { useEffect, useState } from 'react';

const QnA = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setError('User not authenticated. Please login.');
      setLoading(false);
      return;
    }

    fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/qna', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }) // Replace with actual endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch QnA: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading QnA...</p>;
  if (error) return <p>Error loading QnA: {error}</p>;

  return (
    <div>
      <h1>Question & Answer</h1>
      <ul>
        {questions.map((qna) => (
          <li key={qna.id}>{qna.title?.rendered || qna.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default QnA;

import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/wishlist')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch wishlist');
        return res.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.title?.rendered || item.name || item.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;

import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://testlms.measiit.edu.in/wp-json/custom/v1/wishlist')
      .then(res => {
        if (!res.ok) throw new Error('Wishlist data not available. Please check backend configuration.');
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
  if (error) return <p>{error}</p>;

  if (items.length === 0) return <p>Your wishlist is empty.</p>;

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

import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/order_history') // Replace with actual endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch order history');
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading order history...</p>;
  if (error) return <p>Error loading order history: {error}</p>;

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.title?.rendered || order.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;

import React, { useEffect, useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://testlms.measiit.edu.in/wp-json/wp/v2/settings') // Replace with actual endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        return response.json();
      })
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading settings...</p>;
  if (error) return <p>Error loading settings: {error}</p>;

  return (
    <div>
      <h1>Settings</h1>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
};

export default Settings;

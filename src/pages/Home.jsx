import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://testlms.measiit.edu.in/wp-json/wp/v2/posts'); // Updated URL

        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Welcome to Measi E-learning Website</h1>
      <nav>
        <ul>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/assignments">Assignments</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
      <div>
        <h2>Latest Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title.rendered}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;

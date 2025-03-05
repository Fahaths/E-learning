import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState({});

  useEffect(() => {
    // Replace with your WordPress site URL
    const apiUrl = 'https://testlms.measiit.edu.in/wp-json/wp/v2/posts';

    const fetchPostsAndMedia = async () => {
      try {
        const [postsResponse, mediaResponse] = await Promise.all([
          axios.get(apiUrl),
          axios.get('https://testlms.measiit.edu.in/wp-json/wp/v2/media')
        ]);

        setPosts(postsResponse.data);
        const mediaData = mediaResponse.data.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
        setMedia(mediaData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndMedia();
  }, []);

  return (
    <div>
      <h1>WordPress Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            {media[post.featured_media] && (
              <img src={media[post.featured_media].source_url} alt={post.title.rendered} />
            )}
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;

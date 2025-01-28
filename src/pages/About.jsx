import React, { useEffect, useState } from 'react';
import axios from 'axios';

function About() {
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {

        const response = await axios.get('https://testlms.measiit.edu.in/wp-json/wp/v2/pages?slug=about'); // Updated URL
         
        setAboutContent(response.data[0].content.rendered);
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    };

    fetchAboutContent();
  }, []);

  return (
    <div>
      <h1>About Us</h1>
      <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
    </div>
  );
}

export default About;
 
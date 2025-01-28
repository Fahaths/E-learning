import React, { useEffect, useState } from 'react';
import axios from 'axios';

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
    </div>
  );
}

export default About;

import React from "react";
import "./footer.css";


const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2025 Measi E-learning. All rights reserved.</p>
        <p>
          <a href="https://measiit.edu.in/about-miit/">About Us</a> | <a href="/contact">Contact</a>
          <br />
          {" "}
          <a href="https://www.linkedin.com/in/measi-institute-of-information-technology-3979281b3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="bi bi-linkedin"></i>
          </a>
          {" "}
          <a href="https://www.instagram.com/measiit?igsh=MXVrcWo3b2V0N2lieA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="bi bi-instagram"></i>
          </a>
        
          {" "}
          <a href="https://www.facebook.com/measiit/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="bi bi-facebook"></i>
          </a>
          {" "}
          <a href="https://www.youtube.com/channel/UCbssgxXsBwT0NAFuH63SajA" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <i className="bi bi-youtube"></i>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
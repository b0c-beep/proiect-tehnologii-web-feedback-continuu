import React from 'react';
import { Heart } from 'lucide-react';
import '@styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="copyright">
          © 2024 ClassPulse.
        </span>
        <span className="designed-by">
          Designed with 
          <Heart 
            size={16} 
            className="heart-icon" 
            fill="currentColor" 
          /> 
          by Team Boc.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
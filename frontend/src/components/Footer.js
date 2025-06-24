import React from 'react';
// Importing the CSS file 
import './Footer.css';  
// Functional component definition for Footer
const Footer = () => {
return (
  <div className="footer">
    <ul class="menu">
      <li class="menu__item"><a class="menu__link" href="/">Home</a></li>
    </ul>
       {/* Copyright notice */}
      <p>&copy;2025 E-Business-Card | All Rights Reserved</p>
  </div>
  );
}

export default Footer;
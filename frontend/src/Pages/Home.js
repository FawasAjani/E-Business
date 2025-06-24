import React from 'react';
import './Home.css';  // Importing CSS file for styling the Home component
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaLinkedin } from 'react-icons/fa'; //Importing CSS file for styling the Home component

const Home = () => {
  return (
    <div className='parent'>   
      <div className='app-logo'>
        <img src='/images/Fawey.png' alt="logo" className='logo' /> {/*logo section */}
      </div> 

      <div className='app-information'>
        <div className='app-welcome-text'>
          <h1>Welcome</h1>
        </div>
        <br />
        <div className='app-welcome-text'>
          <p>
            E-Business Cards make networking effortless. Create and share a digital portfolio that highlights your products, services, and contact info—all connected to a unique QR code. Forget paper cards—stand out and stay connected anytime, anywhere with a modern, professional touch.
          </p>
        </div>

        <ul className='icons'>
          <li>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <FaFacebook className='app-icon' />
            </a>
          </li>
          <li>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <FaTwitter className='app-icon' />
            </a>
          </li>
          <li>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <FaInstagram className='app-icon' />
            </a>
          </li>
          <li>
            <a href='https://pinterest.com' target='_blank' rel='noopener noreferrer'>
              <FaPinterest className='app-icon' />
            </a>
          </li>
          <li>
            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
              <FaLinkedin className='app-icon' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

// Import core React libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';// Import global CSS styles
import App from './App';// Import the main App component
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "grapesjs/dist/css/grapes.min.css"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

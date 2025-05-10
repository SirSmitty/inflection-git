import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// internal
import './index.css';
import App from './pages/App';
// import Contact from './pages/contact/contact';
import PrivacyPolicy from './pages/privacyPolicy/privacy';
import Services from './pages/services/services';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />  {/* Homepage */}
      {/* <Route path="/contact" element={<Contact />} />  Contact page */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />  {/* Contact page */}
      <Route path="/services" element={<Services />} />  {/* Contact page */}
    </Routes>
  </Router>
  // </React.StrictMode>
);
reportWebVitals();

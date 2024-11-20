import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';
import './App.css';
import backgroundVideo from '../assets/InflectionGradientBG.mp4';
import homePageHeader from '../assets/homePageHeader.svg';
import wordmarkwL from '../assets/wordmarkwL.svg';

function App() {
  const [showContact, setShowContact] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [bgActive, setBgActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); // State for the status message
  const contactPageRef = useRef(null);
  const formRef = useRef(null);

  const handleButtonClick = () => {
    setFadeOut(true); // Trigger fade-out animation
    setTimeout(() => {
      setShowContact(true); // Show contact page after animation
    }, 700); // Match the duration of the fade-out transition
  };

  useEffect(() => {
    if (showContact && contactPageRef.current) {
      setBgActive(true);
      gsap.fromTo(
        contactPageRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, [showContact]);

  const handleSubmit = () => {
    // Collect form data manually
    const formData = {
      name: document.querySelector('[name="name"]').value,
      phoneNumber: document.querySelector('[name="phoneNumber"]').value,
      email: document.querySelector('[name="email"]').value,
      message: document.querySelector('[name="message"]').value,
    };

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    // Send form data using EmailJS
    emailjs
      .send(
        'service_8dm28zu', // Replace with your EmailJS service ID
        'template_qieihix', // Replace with your EmailJS template ID
        formData, // Pass the collected form data
        '9FNfIOJuuQMEP7Fpp' // Your EmailJS public key
      )
      .then(
        (result) => {
          console.log('Email successfully sent!', result.text);
          setStatusMessage('Thank you! Your message has been sent.');
        },
        (error) => {
          console.error('Error sending email:', error.text);
          setStatusMessage('Something went wrong, please try again.');
        }
      );
  };

  return (
    <div className="App">
      {/* Static background video */}
      <video className="video-bg" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Initial content container */}
      {!showContact && (
        <div className={`content-container ${fadeOut ? 'fade-out' : ''}`}>
          <div className="App-content">
            <img src={homePageHeader} width={'30%'} height={'auto'} alt='HomeHeader' />
            <button onClick={handleButtonClick} className="nav-link">
              Enter Now
            </button>
          </div>
        </div>
      )}

      {/* Contact page */}
      {showContact && (
        <>
          <div className="wordmark-header">
            <img src={wordmarkwL} alt='wordmark' />
          </div>
          <div className={`bg-noise ${bgActive ? 'active' : ''}`}></div>
          <div className={`bg-dark-overlay ${bgActive ? 'active' : ''}`}></div>
          <div className="contact-page" ref={contactPageRef}>
            <div className="contact-page-content">
              {/* Header with title and button */}
              <div className="form-header">
                <h1 className="contact-title">Get in Touch</h1>
              </div>

              <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-input"
                    required
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="form-input"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  required
                />
                <div className="contact-textarea-container">
                  <textarea
                    name="message"
                    placeholder="What would you like to discuss with Inflection..."
                    className="form-textarea"
                    required
                  ></textarea>
                </div>
              </form>
              <div className="form-footer">
                <button onClick={handleSubmit} className="submit-button">
                  Submit
                </button>
              </div>
              {statusMessage && (
                <div className="status-message">
                  <p>{statusMessage}</p>
                </div>
              )}
              <div className="new-site-announce">
                <p>New Site Coming Soon</p>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
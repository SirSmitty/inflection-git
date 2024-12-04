import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';
import './App.css';
import backgroundVideo from '../assets/InflectionGradientBG.mp4';
import backgroundjpg from '../assets/BG2.jpg';
import homePageHeader from '../assets/homePageHeader.svg';
import FooterComponent from '../components/footer/footer';
import HeaderComponent from '../components/header/header';
import ScrollSmoother from "../components/gsap-premium/src/ScrollSmoother";
import ScrollTrigger from "../components/gsap-premium/src/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger, ScrollSmoother);



function App() {
  const [showContact, setShowContact] = useState(false);
  const [lowPower, setLowPower] = useState(false)
  const [fadeOut, setFadeOut] = useState(false);
  const [bgActive, setBgActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); // State for the status message
  const contactPageRef = useRef(null);
  const descriptionref = useRef(null);
  const formRef = useRef(null);

  const handleButtonClick = () => {
    setFadeOut(true); // Trigger fade-out animation
    setTimeout(() => {
      setShowContact(true);
    }, 1000);
  };

  const useHideUnimportantErrors = () => {
    useEffect(() => {
      function hideError(e) {
        if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
          const resizeObserverErrDiv = document.getElementById(
            'webpack-dev-server-client-overlay-div'
          );
          const resizeObserverErr = document.getElementById(
            'webpack-dev-server-client-overlay'
          );
          if (resizeObserverErr) {
            resizeObserverErr.setAttribute('style', 'display: none');
          }
          if (resizeObserverErrDiv) {
            resizeObserverErrDiv.setAttribute('style', 'display: none');
          }
        }
      }

      window.addEventListener('error', hideError)
      return () => {
        window.addEventListener('error', hideError)
      }
    }, [])
  }
  useHideUnimportantErrors();

  useEffect(() => {
    const videoElement = document.getElementById("background-video");

    const checkVideoPlayback = async () => {
      try {
        await videoElement.play();
        setLowPower(false);
      } catch (error) {
        setLowPower(true);
      }
    };

    checkVideoPlayback();

    return () => {
      // Cleanup if necessary
    };
  }, []);


  useEffect(() => {

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
    });

    // Handle cleanup and reinitialization on resize
    const handleResize = () => {
      smoother.kill(); // Kill the current instance
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });
    };

    window.addEventListener("resize", handleResize);

    if (showContact && contactPageRef.current) {
      setBgActive(true);

      // Animate the contact page
      gsap.fromTo(
        contactPageRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    // Animate the description section
    const descriptionSection = document.querySelector(".description-section");
    if (descriptionSection) {
      gsap.fromTo(
        descriptionSection,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    return () => {
      smoother.kill(); // Clean up the smoother instance on component unmount
      window.removeEventListener("resize", handleResize);
    };
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
        'service_8dm28zu',
        'template_qieihix',
        formData,
        '9FNfIOJuuQMEP7Fpp'
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


  // init add for branch commit
  return (
    <>
      {showContact && (
        <header className="fixed-header">
          <HeaderComponent />
        </header>
      )}
      <div id="smooth-wrapper">


        <div id="smooth-content">

          <div className="App">
            {/* Static background video */}
            {lowPower ? (
              <img
                className="video-bg"
                src={backgroundjpg}
                alt="Background"
              />
            ) : (
              <video
                id='background-video'
                className="video-bg"
                autoPlay loop muted playsInline>
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Initial content container */}
            {!showContact && (
              <>
                <div className="bg-noise" style={{ opacity: '1' }}></div>
                <div className={`content-container ${fadeOut ? 'fade-out' : ''}`}>
                  <div className="App-content">
                    <img src={homePageHeader} width={'30%'} height={'auto'} alt='HomeHeader' />
                    <button onClick={handleButtonClick} className="nav-link">
                      Enter Now
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Contact page */}
            {showContact && (
              <>
                <div className={`bg-noise ${bgActive ? 'active' : ''}`}></div>
                <div className={`bg-dark-overlay ${bgActive ? 'active' : ''}`}></div>
                <div className='main-content' ref={descriptionref} id="smooth-content" >

                  <div className="description-section">
                    <div className="form-description">
                      <p>
                        Inflection Capital Management is a partner-owned and operated multi-family office
                        based in Silicon Valley, dedicated to advising successful families, individuals,
                        family offices, and foundations in preserving and building their wealth and legacy.
                        With a commitment to personal connection and a deep understanding of our clients'
                        unique goals, we serve as trusted stewards for generations to come.
                      </p>
                    </div>
                    <div
                      className="scroll-arrow"
                      onClick={() => {
                        const yOffset = contactPageRef.current.offsetTop; // Get the contact section's position
                        window.scrollTo({
                          top: yOffset,
                          behavior: "smooth", // Smooth scroll behavior
                        });
                      }}
                    >
                      <span>&#8595;</span>
                    </div>
                  </div>
                  <div className="contact-page" ref={contactPageRef}>
                    <div className="contact-page-content">
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
                            autoComplete="off"
                            required
                          />
                          <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            className="form-input"
                            autoComplete="off"
                            required
                          />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="form-input"
                          autoComplete="off"
                          required
                        />
                        <div className="contact-textarea-container">
                          <textarea
                            name="message"
                            placeholder="What would you like to discuss with Inflection..."
                            className="form-textarea"
                            autoComplete="off"
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
                  <FooterComponent />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
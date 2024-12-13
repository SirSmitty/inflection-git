import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';
import ScrollSmoother from "../components/gsap-premium/src/ScrollSmoother";
import ScrollTrigger from "../components/gsap-premium/src/ScrollTrigger";
import { SplitText } from '../components/gsap-premium/src/SplitText';
// internal
import './App.css';
import backgroundVideo from '../assets/InflectionGradientBG.mp4';
import FooterComponent from '../components/footer/footer';
import HeaderComponent from '../components/header/header';

import backgroundjpg from '../assets/BG2.jpg';
import bottomParalax from '../assets/mainInfo/paralaxBottom.png';
import homePageHeader from '../assets/homePageHeader.svg';
import wordmark from '../assets/wordmark.svg';
import poi1 from '../assets/mainInfo/portfolio/poi1.png';
import poi2 from '../assets/mainInfo/portfolio/poi2.png';
import logoWhite from '../assets/logos/logoWhite.png';
import Carousel from '../components/carosel/carousel';



gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);



function App() {
  const [showContent, setshowContent] = useState(false);
  const [lowPower, setLowPower] = useState(false)
  const [fadeOut, setFadeOut] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [smoother, setSmoother] = useState(null);

  const contactPageRef = useRef(null);
  const formRef = useRef(null);
  const sectionRef = useRef(null); // Reference for the whole section
  const headlineRef = useRef(null); // Reference for the main headline
  const paragraphRef = useRef(null); // Reference for the paragraph
  const theWysRef = useRef(null);
  const storyTextRef = useRef(null);

  const aboutUsRef = useRef(null);
  const contactRef = useRef(null);


  const [shouldFadeIn, setShouldFadeIn] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (showContent) {
      // Wait for the next frame to add the fade-in class
      requestAnimationFrame(() => {
        setShouldFadeIn(true);
      });
    }
  }, [showContent]);

  const handleButtonClick = () => {
    setFadeOut(true); // Trigger fade-out animation
    setTimeout(() => {
      setshowContent(true);
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

  // Check if the device is mobile
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    updateIsMobile(); // Check on mount
    window.addEventListener('resize', updateIsMobile); // Update on resize

    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = bottomParalax;
    img.onload = () => setImageLoaded(true);
  }, []);


  // paralax
  useEffect(() => {
    if (!showContent) return;
    ScrollTrigger.refresh(); // Ensure triggers are recalibrated

    const initializeParallax = () => {
      const target = document.querySelector(".paralax-section");
      if (!target) {
        console.log("no target")
        return; // Ensure the target exists
      }


      if (isMobile) {
        gsap.to(target, {
          backgroundPosition: "45% -200px", // Different parallax for mobile
          ease: "none",
          scrollTrigger: {
            trigger: target,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      } else {
        gsap.to(target, {
          backgroundPosition: "center -200px", // Move background upward
          ease: "none",
          scrollTrigger: {
            trigger: target,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    };

    // Delay to allow rendering
    setTimeout(initializeParallax, 100);
  }, [showContent, isMobile]);

  // low power useEffect
  useEffect(() => {

    const videoElement = document.getElementById("background-video");
    if (!videoElement) return;

    setTimeout(() => {
      const attemptPlay = async () => {
        try {
          await videoElement.play();
          setLowPower(false);
        } catch (error) {
          console.log(error);
          setLowPower(true);
        }
      };
      attemptPlay()
    }, 1000)

  }, []);

  // smoothscroll useEffect
  useEffect(() => {

    if (isMobile) {
      return;
    }

    const newSmoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
    });

    // Handle cleanup and reinitialization on resize
    const handleResize = () => {
      newSmoother.kill(); // Kill the current instance
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });
    };
    setSmoother(newSmoother);

    window.addEventListener("resize", handleResize);

    if (showContent && contactPageRef.current) {

      // Animate the contact page
      gsap.fromTo(
        contactPageRef.current,
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }

    // Animate the description section
    const paralaxSection = document.querySelector(".paralax-section");
    if (paralaxSection) {
      gsap.fromTo(
        paralaxSection,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }

    return () => {
      newSmoother.kill(); // Clean up the smoother instance on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, [showContent, isMobile]);


  // story gsap
  useEffect(() => {
    if (!showContent) return;
    let splitHeadline;
    let splitParagraph;

    const animateSplitText = () => {
      splitHeadline = new SplitText(headlineRef.current, { type: "words,chars" });
      splitParagraph = new SplitText(paragraphRef.current, { type: "lines,words", linesClass: "split-line" });
      function allDone() {
        splitParagraph.revert();
      }

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Start animation when section is 80% visible
          end: "bottom 20%",
          toggleActions: "play none none none", // Rewind when out of view
        },
      });

      tl.from(".story-text", {
        opacity: 0,
        y: 50, // Move upward by 50px
        duration: 0.8,
        ease: "power2.out",
      });
      // Animate headline characters
      tl.from(splitHeadline.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
      });

      // Animate paragraph lines
      tl.from(splitParagraph.lines, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: allDone
      });
    };

    // Ensure fonts are fully loaded
    document.fonts.ready
      .then(() => {
        animateSplitText();
      })
      .catch((error) => {
        console.error("Error loading fonts:", error);
      });

    return () => {
      // Cleanup SplitText instances
      if (splitHeadline) splitHeadline.revert();
      if (splitParagraph) splitParagraph.revert();
    };
  }, [showContent]);

  // description animations on profiles
  useEffect(() => {
    const sections = document.querySelectorAll("[data-animate='split-text']");

    sections.forEach((section) => {
      const paragraphs = section.querySelectorAll(".poi-description p");
      if (!paragraphs.length) return;

      let splitInstances = [];

      const setupSplitText = () => {
        // Initialize SplitText for the hovered section only
        splitInstances = Array.from(paragraphs).map(
          (paragraph) => new SplitText(paragraph, { type: "lines" })
        );
      };

      const cleanupSplitText = () => {
        // Revert SplitText instances
        splitInstances.forEach((split) => split.revert());
        splitInstances = [];
      };

      const animateLines = () => {
        const allLines = splitInstances.flatMap((split) => split.lines);

        gsap.from(allLines, {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          immediateRender: true,
          onStart: () => {
            allLines.forEach((line) => {
              line.style.textAlign = "center";
            });
          },
        });
      };

      // Event listeners for hover
      const handleMouseEnter = () => {
        setupSplitText();
        animateLines();
      };

      const handleMouseLeave = () => {
        cleanupSplitText();
      };

      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup on unmount
      return () => {
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [showContent]);

  // the Wys useEffect
  useEffect(() => {
    if (!showContent || !theWysRef.current) return;

    // Check if mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // On mobile, create separate triggers for each section
      gsap.from(theWysRef.current.querySelector('.why'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: theWysRef.current.querySelector('.why'),
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });

      gsap.from(theWysRef.current.querySelector('.what'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: theWysRef.current.querySelector('.what'),
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });

      gsap.from(theWysRef.current.querySelector('.how'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: theWysRef.current.querySelector('.how'),
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });

    } else {
      // On desktop (or non-mobile), original grouped animation
      const sections = theWysRef.current.querySelectorAll(".why, .what, .how");
      gsap.from(sections, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: theWysRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    }
  }, [showContent]);

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


  const toggleDescription = (sectionId) => {
    setActiveSection((prevSection) => {
      const isClosing = prevSection === sectionId;
      const newSection = isClosing ? null : sectionId;

      if (isClosing) {
        // Scroll back to the top of the section after a slight delay
        setTimeout(() => {
          const elementId = `${sectionId}-container`;
          console.log("elementid", elementId);
          const element = document.querySelector(`.${elementId}`);
          console.log("element", element);

          if (element) {
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            const offset = 50; // Adjust this value as needed
            window.scrollTo({
              top: elementTop - offset,
              behavior: "smooth",
            });
          } else {
            console.log("element not found");
          }
        }, 100); // 100ms delay to allow layout to update
      }

      return newSection;
    });
  };


  // init add for branch commit
  return (
    <>

      {showContent && (
        <header className="fixed-header">
          <HeaderComponent smoother={smoother} />
        </header>
      )}
      {!isMobile ? (<>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className="App">
              {!showContent && (
                <>
                  <div className={`intro-content-container ${fadeOut ? 'fade-out' : ''}`}>
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
                    <div className="bg-noise" style={{ opacity: '1' }}></div>
                    <div className={`content-container ${fadeOut ? 'fade-out' : ''}`}>
                      <div className="App-content">
                        <img src={homePageHeader} width={'30%'} height={'auto'} alt='HomeHeader' />
                        <button onClick={handleButtonClick} className="nav-link">
                          Enter Now
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {showContent && (
                <>
                  <div className={`main-content ${shouldFadeIn ? 'fade-in' : ''}`} id="smooth-content">
                    <div className="paralax-section" style={{ position: 'relative', overflow: 'hidden' }}>
                      <div className="wordmark">
                        <img src={wordmark} alt="Inflection Wordmark" />
                      </div>
                    </div>
                    <div className='main-content-container'>
                      {/* Combined Background */}
                      <div className={`combined-bg-wrapper ${isImageLoaded ? "loaded" : ""}`}>
                        <img
                          src={bottomParalax} // Replace with your image path
                          alt="Parallax Background"
                          className="combined-bg-img"
                          onLoad={handleImageLoad}
                        />
                      </div>
                      <div className="story-of-page" id='about' ref={aboutUsRef}>
                        <div className='storyInflec'>
                          <div className='story-image'>
                            <img src={logoWhite} alt='story' />
                          </div>
                          <div className='story-text' ref={storyTextRef}>
                            <h1 ref={headlineRef}>
                              The Story of <span style={{ fontFamily: 'GTMI' }}>Inflection</span>
                            </h1>
                            <p ref={paragraphRef}>
                              <span style={{ fontFamily: 'GTMI' }} id='inflectionStory'>Inflection Capital Management</span>{" "}is a partner-owned and operated multi-family office based in Silicon Valley, dedicated to working with clients to preserve and grow their wealth and legacy. Our careers have been dedicated to working with wealth creators, families navigating periods of transition, and family offices, including their foundations. With a commitment to personal connection and a deep understanding of our clients' unique goals, we serve as trusted stewards for generations to come.
                            </p>
                          </div>
                        </div>
                        <div className='breakLine-container'>
                          <div id='after-storyText-Break' className='breakLine'></div>
                        </div>
                        <div className='theWys' ref={theWysRef}>
                          <div className='why'>
                            <h1>Our Clients Inspire Us</h1>
                            {/* <h3>&#40;The Why&#41;</h3> */}
                            <p>
                              We believe that people thrive when they have the space, support, and resources to focus on what matters most. At Inflection, we are inspired by our clients&#39; passions and motivations, whether that be family, business, or philanthropy.
                              We recognize that our clients are not interchangeable, which is why we believe in a personalized relationship for each client, allowing them to maximize their time and focus on their pursuits.

                            </p>
                          </div>
                          <div className='what'>
                            <h1>Our Partnership</h1>
                            {/* <h3>&#40;The What&#41;</h3> */}
                            <p>
                              We meet you at the inflection point of your legacy and wealth, collaborating to build the infrastructure to support your family&#39;s unique needs. With institutional-level expertise, we enhance both your financial well-being and personal affairs. Acting as your advocate, we design a refined investment portfolio that aligns precisely with your vision for protecting and growing your assets.
                            </p>
                          </div>
                          <div className='how'>
                            <h1>Success Together</h1>
                            {/* <h3>&#40;The How&#41;</h3> */}
                            <p>
                              As your partner, we leverage decades of experience of working with hundreds of single family offices and successful families, offering you a uniquely informed perspective. After establishing your financial priorities, we provide clarity and direction, acting as your steward to safeguard and grow your legacy for generations to come.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='infoBottom'></div>
                      <div className='carosel-container'>
                        <Carousel />
                      </div>
                      <div className='portfolio-container'>
                        <div className='POI1-container' data-animate='split-text'>
                          <div className='mobile-container'>
                            <div className='mobile-pic-container'>
                              <img src={poi1} alt='poi1' />
                            </div>
                            <div className='poi-title' id='poi1-title'>
                              <h2>
                                Justin Kunz
                              </h2>
                              <p>
                                CEO | Founding Partner
                              </p>
                            </div>
                            <div
                              className={`poi-description ${isMobile && activeSection === "POI1" ? "visible" : ""
                                }`}
                              id="poi1-description"
                            >
                              <p>
                                Justin Kunz is the CEO and Founding Partner of Inflection Capital Management, where he leads the firm&#39;s business, investment strategy and manages client relationships. With two decades of experience in wealth management and family office services, Justin has built a reputation for providing personalized solutions and strategic guidance to ultra-high-net-worth families and institutions.
                              </p>
                              <p>
                                Justin began his career in 2005 and in 2007, started working at Fidelity Investments, where he played a pivotal role in establishing the West Coast presence of Fidelity&#39;s Family Office team. During his tenure, he oversaw over $20 billion in client assets, offering investment expertise, bespoke private market allocations, and comprehensive asset safeguarding services.
                              </p>
                              <p>
                                Following Fidelity, Justin joined BlackRock as Head of the West Coast Family Office team, where he also contributed to the firm&#39;s national family office strategy. At BlackRock, he partnered with institutional families and family offices to deliver the full spectrum of the firm's investment capabilities. His approach emphasized data-driven insights and dynamic portfolio management across all asset classes, including public equity, fixed income, hedge funds, private equity, venture capital, private credit, real estate, and risk and tax mitigation strategies.
                              </p>
                              <p>
                                Justin earned a degree in Economics from the Eller College of Business at the University of Arizona, where he served on the Student Advisory Board and was captain of the men&#39;s Rugby team. He remains deeply committed to philanthropy, actively supporting foundations dedicated to youth athletics in the Bay Area. Additionally, he provides consultation and contributes to the stewardship of Graeagle, California.
                              </p>
                              <p>
                                Justin resides in Marin, California, with his wife, Lindsay, and their two children.
                              </p>
                            </div>
                            {isMobile && (
                              <div className="read-bio-button">
                                <button onClick={() => toggleDescription("POI1")}>
                                  {activeSection === "POI1" ? "- Read Less" : "+ Read Bio"}
                                </button>
                              </div>
                            )}
                          </div>

                        </div>
                        <div className='POI2-container' data-animate='split-text'>
                          <div className='mobile-container'>
                            <div className='mobile-pic-container'>
                              <img src={poi2} alt='poi2' />
                            </div>
                            <div className='poi-title' id='poi2-title'>
                              <h2>
                                Katie Riley Mahany
                              </h2>
                              <p id='poi2-align'>
                                Managing Partner
                              </p>
                            </div>
                            <div
                              className={`poi-description ${isMobile && activeSection === "POI2" ? "visible" : ""
                                }`}
                              id="poi2-description"
                            >
                              <p>
                                Katie Riley Mahany is a Managing Partner at Inflection Capital Management, playing a key role supporting strategic client relationships, business strategy and operations.
                              </p>
                              <p>
                                Katie joined Inflection from BlackRock, where, in 2019 she began her tenure as an Analyst in the Institutional Client Business. Because of her deep client relationships and penchant for leadership, she grew to lead relationship manager for key family office and foundation clients, overseeing a portfolio totaling over $5.6 billion by 2024. Throughout her time at BlackRock, Katie helped to deliver investment solutions across public and private markets to her clients, with a focus on risk management and tax mitigation. Katie was recognized for creating and leading mentorship programs for junior team members, enhancing both team development and client service across the firm, something she is proud to bring to the team at Inflection.
                              </p>
                              <p>
                                Katie has always had a passion for education, having earned recognition as a Fulbright Scholar, teaching English in Madrid, Spain from 2014-2015, where she honed her communication skills and global perspective. She spent her early career working in education in both the US and Europe, teaching and tutoring high school students in language, reading and study skills. Katie brings an educational lens to work every day, focusing on providing clarity to her clients with empathy and financial acumen through even the most complex processes.
                              </p>
                              <p>
                                Katie graduated with a BA in Political Science and Spanish from College of the Holy Cross, Phi Beta Kappa, magna cum laude. She also received her MSc in Business Management from Trinity College Dublin in 2017, with distinction.
                              </p>
                            </div>
                            {isMobile && (
                              <div className="read-bio-button">
                                <button onClick={() => toggleDescription("POI2")}>
                                  {activeSection === "POI2" ? "- Read Less" : "+ Read Bio"}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="contact-page-content" id='contact' ref={contactRef}>
                        <div className='contact-background-overlay'></div>
                        <div className="form-header">
                          <h1 className="contact-title"><span style={{ fontFamily: "RoobertoL" }}>Meet with the</span> Inflection Team</h1>
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

                      </div>
                      <FooterComponent />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
      ) : (
        <>
          <div className="App">
            {!showContent && (
              <>
                <div className={`intro-content-container ${fadeOut ? 'fade-out' : ''}`}>
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
                      autoPlay loop muted playsInline preload="auto">
                      <source src={backgroundVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="bg-noise" style={{ opacity: '1' }}></div>
                  <div className={`content-container ${fadeOut ? 'fade-out' : ''}`}>
                    <div className="App-content">
                      <img src={homePageHeader} width={'30%'} height={'auto'} alt='HomeHeader' />
                      <button onClick={handleButtonClick} className="nav-link">
                        Enter Now
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showContent && (
              <>
                <div className={`main-content ${shouldFadeIn ? 'fade-in' : ''}`} id="smooth-content">
                  <div className="paralax-section" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="wordmark">
                      <img src={wordmark} alt="Inflection Wordmark" />
                    </div>
                  </div>
                  <div className='main-content-container'>
                    <div className={`combined-bg-wrapper ${isImageLoaded ? "loaded" : ""}`}>
                      <img
                        src={bottomParalax} // Replace with your image path
                        alt="Parallax Background"
                        className="combined-bg-img"
                        onLoad={handleImageLoad}
                      />
                    </div>
                    <div className="story-of-page" id='about' ref={aboutUsRef}>
                      <div className='storyInflec'>
                        <div className='story-image'>
                          <img src={logoWhite} alt='story' />
                        </div>
                        <div className='story-text'>
                          <h1 ref={headlineRef}>
                            The Story of <span style={{ fontFamily: 'GTMI' }}>Inflection</span>
                          </h1>
                          <p ref={paragraphRef}>
                            <span style={{ fontFamily: 'GTMI' }} id='inflectionStory'>Inflection Capital Management</span>{" "}is a partner-owned and operated multi-family office based in Silicon Valley, dedicated to working with clients to preserve and grow their wealth and legacy. Our careers have been devoted to working with wealth creators, families navigating periods of transition, and family offices, including their foundations. With a commitment to personal connection and a deep understanding of our clients' unique goals, we serve as trusted stewards for generations to come.
                          </p>
                        </div>
                      </div>
                      <div className='breakLine-container'>
                        <div id='after-storyText-Break' className='breakLine'></div>
                      </div>
                      <div className='theWys' ref={theWysRef}>
                        <div className='why'>
                          <h1>Our Clients Inspire Us</h1>
                          {/* <h3>&#40;The Why&#41;</h3> */}
                          <p>
                            We believe that people thrive when they have the space, support, and resources to focus on what matters most. At Inflection, we are inspired by our clients&#39; passions and motivations, whether that be family, business, or philanthropy.
                            We recognize that our clients are not interchangeable, which is why we believe in a personalized relationship for each client, allowing them to maximize their time and focus on their pursuits.
                          </p>
                        </div>
                        <div className='what'>
                          <h1>Our Partnership</h1>
                          {/* <h3>&#40;The What&#41;</h3> */}
                          <p>
                            We meet you at the inflection point of your legacy and wealth, collaborating to build the infrastructure to support your family&#39;s unique needs. With institutional-level expertise, we enhance both your financial well-being and personal affairs. Acting as your advocate, we design a refined investment portfolio that aligns precisely with your vision for protecting and growing your assets.
                          </p>
                        </div>
                        <div className='how'>
                          <h1>Success Together</h1>
                          {/* <h3>&#40;The How&#41;</h3> */}
                          <p>
                            As your partner, we leverage decades of experience of working with hundreds of single family offices and successful families, offering you a uniquely informed perspective. After establishing your financial priorities, we provide clarity and direction, acting as your steward to safeguard and grow your legacy for generations to come.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='infoBottom'></div>
                    <div className='carosel-container'>
                      <Carousel />
                    </div>
                    <div className='portfolio-container'>
                      <div className='POI1-container' data-animate='split-text'>
                        <div className='mobile-container'>
                          <div className='mobile-pic-container'>
                            <img src={poi1} alt='poi1' />
                          </div>
                          <div className='poi-title' id='poi1-title'>
                            <h2>
                              Justin Kunz
                            </h2>
                            <p>
                              CEO | Founding Partner
                            </p>
                          </div>
                          <div
                            className={`poi-description ${isMobile && activeSection === "POI1" ? "visible" : ""
                              }`}
                            id="poi1-description"
                          >
                            <p>
                              Justin Kunz is the CEO and Founding Partner of Inflection Capital Management, where he leads the firm&#39;s business, investment strategy and manages client relationships. With two decades of experience in wealth management and family office services, Justin has built a reputation for providing personalized solutions and strategic guidance to ultra-high-net-worth families and institutions.
                            </p>
                            <p>
                              Justin began his career in 2005 and in 2007, started working at Fidelity Investments, where he played a pivotal role in establishing the West Coast presence of Fidelity&#39;s Family Office team. During his tenure, he oversaw over $20 billion in client assets, offering investment expertise, bespoke private market allocations, and comprehensive asset safeguarding services.
                            </p>
                            <p>
                              Following Fidelity, Justin joined BlackRock as Head of the West Coast Family Office team, where he also contributed to the firm&#39;s national family office strategy. At BlackRock, he partnered with institutional families and family offices to deliver the full spectrum of the firm's investment capabilities. His approach emphasized data-driven insights and dynamic portfolio management across all asset classes, including public equity, fixed income, hedge funds, private equity, venture capital, private credit, real estate, and risk and tax mitigation strategies.
                            </p>
                            <p>
                              Justin earned a degree in Economics from the Eller College of Business at the University of Arizona, where he served on the Student Advisory Board and was captain of the men&#39;s Rugby team. He remains deeply committed to philanthropy, actively supporting foundations dedicated to youth athletics in the Bay Area. Additionally, he provides consultation and contributes to the stewardship of Graeagle, California.
                            </p>
                            <p>
                              Justin resides in Marin, California, with his wife, Lindsay, and their two children.
                            </p>
                          </div>
                          {isMobile && (
                            <div className="read-bio-button">
                              <button onClick={() => toggleDescription("POI1")}>
                                {activeSection === "POI1" ? "- Read Less" : "+ Read Bio"}
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                      <div className='POI2-container' data-animate='split-text'>
                        <div className='mobile-container'>
                          <div className='mobile-pic-container'>
                            <img src={poi2} alt='poi2' />
                          </div>
                          <div className='poi-title' id='poi2-title'>
                            <h2>
                              Katie Riley Mahany
                            </h2>
                            <p id='poi2-align'>
                              Managing Partner
                            </p>
                          </div>
                          <div
                            className={`poi-description ${isMobile && activeSection === "POI2" ? "visible" : ""
                              }`}
                            id="poi2-description"
                          >
                            <p>
                              Katie Riley Mahany is a Managing Partner at Inflection Capital Management, playing a key role supporting strategic client relationships, business strategy and operations.
                            </p>
                            <p>
                              Katie joined Inflection from BlackRock, where, in 2019 she began her tenure as an Analyst in the Institutional Client Business. Because of her deep client relationships and penchant for leadership, she grew to lead relationship manager for key family office and foundation clients, overseeing a portfolio totaling over $5.6 billion by 2024. Throughout her time at BlackRock, Katie helped to deliver investment solutions across public and private markets to her clients, with a focus on risk management and tax mitigation. Katie was recognized for creating and leading mentorship programs for junior team members, enhancing both team development and client service across the firm, something she is proud to bring to the team at Inflection.
                            </p>
                            <p>
                              Katie has always had a passion for education, having earned recognition as a Fulbright Scholar, teaching English in Madrid, Spain from 2014-2015, where she honed her communication skills and global perspective. She spent her early career working in education in both the US and Europe, teaching and tutoring high school students in language, reading and study skills. Katie brings an educational lens to work every day, focusing on providing clarity to her clients with empathy and financial acumen through even the most complex processes.
                            </p>
                            <p>
                              Katie graduated with a BA in Political Science and Spanish from College of the Holy Cross, Phi Beta Kappa, magna cum laude. She also received her MSc in Business Management from Trinity College Dublin in 2017, with distinction.
                            </p>
                          </div>
                          {isMobile && (
                            <div className="read-bio-button">
                              <button onClick={() => toggleDescription("POI2")}>
                                {activeSection === "POI2" ? "- Read Less" : "+ Read Bio"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="contact-page-content" id='contact' ref={contactRef}>
                      <div className='contact-background-overlay'></div>
                      <div className="form-header">
                        <h1 className="contact-title"><span style={{ fontFamily: "RoobertoL" }}>Meet with the</span> Inflection Team</h1>
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

                    </div>
                    <FooterComponent />
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}


    </>
  );
}

export default App;
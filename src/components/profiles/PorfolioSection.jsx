import React, { useState, useEffect } from "react";
import { gsap } from 'gsap';
import ScrollSmoother from "../gsap-premium/src/ScrollSmoother";
import ScrollTrigger from "../gsap-premium/src/ScrollTrigger";
import { SplitText } from '../gsap-premium/src/SplitText';
import poi1 from '../../assets/mainInfo/portfolio/poi1.png';
import poi2 from '../../assets/mainInfo/portfolio/poi2.png';
import './PorfolioSection.css';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const PortfolioSection = () => {
  const [activeDescription, setActiveDescription] = useState(null); // Track active description
  const [isMobile, setIsMobile] = useState(false);
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

  // description animations on profiles
  useEffect(() => {
    const sections = document.querySelectorAll("[data-animate='split-text']");

    sections.forEach((section) => {
      const paragraphs = section.querySelectorAll(".poi-description p");
      if (!paragraphs.length) return;

      let splitInstances = [];

      const setupSplitText = () => {
        splitInstances = Array.from(paragraphs).map(
          (paragraph) => new SplitText(paragraph, { type: "lines" })
        );
        console.log("SplitText instances set up:", splitInstances);
      };

      const cleanupSplitText = () => {
        console.log("Cleaning up SplitText instances...");
        splitInstances.forEach((split) => split.revert());
        splitInstances = [];
      };

      const animateLines = () => {
        const allLines = splitInstances.flatMap((split) => split.lines); // Collect all lines

        gsap.from(allLines, {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          onStart: () => console.log("Animating lines:", allLines),
          onComplete: () => console.log("Animation complete for:", allLines),
        });
      };

      // Event listeners for hover
      const handleMouseEnter = () => {
        cleanupSplitText(); // Clean up before re-initializing
        setupSplitText();
        animateLines(); // Trigger animation
      };

      const handleMouseLeave = () => {
        cleanupSplitText(); // Clean up after mouse leaves
      };

      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup on unmount
      return () => {
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
        cleanupSplitText(); // Clean up SplitText on unmount
      };
    });
  }, []);

  const handleShowDescription = (id) => {
    setActiveDescription(id); // Show the selected description
  };

  const handleCloseDescription = () => {
    setActiveDescription(null); // Close the fullscreen description
  };

  return (
    <>
      {/* POI 1 */}
      <div
        className="POI1-container"
        data-animate="split-text"
        onClick={() => handleShowDescription(1)} // Open fullscreen on click
      >
        <img src={poi1} alt='poi1' />
        <div className="poi-title" id="poi1-title">
          <h2>Justin Kunz</h2>
          <p>CEO | Founding Partner</p>
        </div>
        <div className="poi-description" id="poi1-description">
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
      </div>

      {/* POI 2 */}
      <div
        className="POI2-container"
        data-animate="split-text"
        onClick={() => handleShowDescription(2)} // Open fullscreen on click
      >
        <img src={poi2} alt='poi2' />
        <div className="poi-title" id="poi2-title">
          <h2>Katie Riley Mahany</h2>
          <p>Managing Partner</p>
        </div>
        <div className="poi-description" id="poi1-description">
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
      </div>
    </>
  );
};

export default PortfolioSection;
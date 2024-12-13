import React, { useState, useEffect, useMemo, useRef } from "react";
import "./carousel.css"; // Import your styles
import leftArrow from '../../assets/mainInfo/carousel/leftArrow.svg';
import rightArrow from '../../assets/mainInfo/carousel/rightArrow.svg';
import beach from '../../assets/mainInfo/carousel/beach_copy.jpg';
import bridge from '../../assets/mainInfo/carousel/bridge.jpg';
import farm from '../../assets/mainInfo/carousel/farm_copy.jpg';
import { gsap } from 'gsap';
import { useSwipeable } from "react-swipeable";
import ScrollSmoother from "../../components/gsap-premium/src/ScrollSmoother";
import ScrollTrigger from "../../components/gsap-premium/src/ScrollTrigger";
import { SplitText } from '../../components/gsap-premium/src/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(1); // Start at the first actual slide
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const headlineRefs = useRef([]); // Array of refs for headlines
    const paragraphRefs = useRef([]); // Array of refs for paragraphs
    const splitInstances = useRef([]); // Store SplitText instances for cleanup

    const slides = useMemo(() => [
        {
            image: farm,
            title: (
                <>
                    Generational <span style={{ fontFamily: 'GTMI' }}>Stewardship</span>
                </>
            ),
            description: (<>We are dedicated to refining your plan over time, supporting your family&#39;s legacy and long-term well-being.</>),
        },
        {
            image: beach,
            title: (
                <>
                    Establishing Clear <span style={{ fontFamily: 'GTMI' }}>Priorities</span>
                </>
            ),
            description: (<>Relationships are at the core of our business. We start by listening to understand your family&#39;s goals and working with you to develop wealth management solutions that meet your specific needs, communicating clearly and educating you every step of the way. </>),
        },
        {
            image: bridge,
            title: (
                <>
                    Building a <span style={{ fontFamily: 'GTMI' }}>Strategic Path Forward</span>
                </>
            ),
            description: (<>At the foundation of asset protection, we integrate estate planning, tax strategies and advanced investment solutions in a clear manner that is focused on your best interests.</>),
        },
    ], []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Preload adjacent images
    useEffect(() => {
        const preloadImage = (src) => {
            if (!src) return;
            const img = new Image();
            img.src = src;
        };

        const prevSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
        const nextSlideIndex = (currentSlide + 1) % slides.length;

        preloadImage(slides[prevSlideIndex]?.image);
        preloadImage(slides[nextSlideIndex]?.image);
    }, [currentSlide, slides]);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const nextSlide = (currentSlide + 1) % slides.length; // loops back to 0 after last slide
        setCurrentSlide(nextSlide);
        animateSplitText(nextSlide);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const prevSlide = (currentSlide - 1 + slides.length) % slides.length; // loops back to last slide from first
        setCurrentSlide(prevSlide);
        animateSplitText(prevSlide);
    };

    const animateSplitText = (index) => {
        const headline = headlineRefs.current[index];
        const paragraph = paragraphRefs.current[index];

        if (!headline || !paragraph) return;

        // Cleanup existing instances
        splitInstances.current.forEach((instance) => instance.revert());
        splitInstances.current = [];

        // Create new SplitText instances
        const splitHeadline = new SplitText(headline, { type: "words,chars" });
        const splitParagraph = new SplitText(paragraph, { type: "lines,words", linesClass: "split-line" });

        splitInstances.current.push(splitHeadline, splitParagraph);

        const tl = gsap.timeline({
            onComplete: () => setIsAnimating(false) // Animation complete, no longer animating
        });

        tl.from(splitParagraph.lines, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
        });
    };

    useEffect(() => {
        document.fonts.ready
            .then(() => {
                animateSplitText(currentSlide);
            })
            .catch((error) => {
                console.error("Error loading fonts:", error);
            });
        return () => {
            // Cleanup SplitText instances on component unmount
            splitInstances.current.forEach((instance) => instance.revert());
        };
    }, [currentSlide]); // Run on initial mount to animate the first slide


    // Swipe handling
    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrev(),
        trackTouch: true,
        trackMouse: false,
    });

    // Pagination click handling for mobile
    const handleDotClick = (slideIndex) => {
        if (isAnimating) return;
        // slideIndex corresponds to the index in the original slides array (1-based in extended)
        const targetIndex = slideIndex + 1;
        setCurrentSlide(targetIndex);
        animateSplitText(targetIndex);
    };

    return (
        <div className="carousel">
            <div className="carousel-slide-container" {...(isMobile ? handlers : {})}>
                <div className="carousel-header">
                    <h1>Our Approach</h1>
                    <p>When working with clients we are committed to:</p>
                </div>
                <div className='carousel-breakLine-container'>
                    <div id='after-storyText-Break' className='carousel-breakLine'></div>
                </div>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`carousel-slide ${currentSlide === index ? "active" : ""}`}
                    >
                        <img src={slide.image} alt={slide.title} className="carousel-image" />
                        {index === currentSlide && (
                            <div className="carousel-text">
                                <h2 ref={(el) => (headlineRefs.current[index] = el)}>{slide.title}</h2>
                                <p ref={(el) => (paragraphRefs.current[index] = el)}>{slide.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {!isMobile && (
                <>
                    <button className="carousel-arrow left-arrow" onClick={handlePrev}>
                        <img src={leftArrow} alt="Previous Slide" className="arrow-icon" />
                    </button>
                    <button className="carousel-arrow right-arrow" onClick={handleNext}>
                        <img src={rightArrow} alt="Next Slide" className="arrow-icon" />
                    </button>
                </>
            )}

            {isMobile && (
                <div className="carousel-pagination">
                    {slides.map((_, i) => {
                        const isActive = currentSlide === i;
                        return (
                            <div
                                key={i}
                                className={`carousel-dot ${isActive ? 'active' : ''}`}
                                onClick={() => handleDotClick(i)}
                            ></div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Carousel;
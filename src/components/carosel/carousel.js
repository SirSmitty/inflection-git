import React, { useState, useEffect, useMemo, useRef } from "react";
import "./carousel.css"; // Import your styles
import leftArrow from '../../assets/mainInfo/carousel/leftArrow.svg';
import rightArrow from '../../assets/mainInfo/carousel/rightArrow.svg';
import beach from '../../assets/mainInfo/carousel/beach_copy.jpg';
import bridge from '../../assets/mainInfo/carousel/bridge.jpg';
import Abstraction from '../../assets/mainInfo/carousel/BG4.jpg';
import farm from '../../assets/mainInfo/carousel/farm_copy.jpg';
import { gsap } from 'gsap';
import { useSwipeable } from "react-swipeable";
import ScrollSmoother from "../../components/gsap-premium/src/ScrollSmoother";
import ScrollTrigger from "../../components/gsap-premium/src/ScrollTrigger";
import { SplitText } from '../../components/gsap-premium/src/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// commented on car
const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0); // Start at the first actual slide
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const headlineRefs = useRef([]); // Array of refs for headlines
    const paragraphRefs = useRef([]); // Array of refs for paragraphs
    const splitInstances = useRef([]); // Store SplitText instances for cleanup

    const slides = useMemo(() => [
        {
            image: beach,
            title: (
                <>
                    The Inflection  <span style={{ fontFamily: 'GTMI' }}>Client Experience</span>
                </>
            ),
            description: (<>Our 25+ years spent advising single-family offices, foundations, and institutional allocators shape everything we do. We bring that same level of rigorous risk management and discipline directly to our clients. Clarity sits at the center of the relationship: transparent fees, intuitive reporting, and education tailored to your needs. Our philosophy is simple—bring order and intention to the complexity that comes with meaningful wealth. </>),
        },
        {
            image: bridge,
            title: (
                <>
                    Built for  <span style={{ fontFamily: 'GTMI' }}>Modern Wealth</span>
                </>
            ),
            description: (<>Our model is intentionally adaptable. We can partner around a wealth transition phase, steward an entire portfolio, or coordinate the full architecture—tax, estate, philanthropy, governance, and investment strategy—as your needs evolve. There is no one-size-fits-all approach; each relationship is designed around where you are today and where you’re headed next. </>),
        },
        {
            image: farm,
            title: (
                <>
                    Investment<span style={{ fontFamily: 'GTMI' }}>Philosophy</span>
                </>
            ),
            description: (<>Inflection centers portfolios around partnering selectively with boutique managers who demonstrate alignment, discipline, and long-term thinking—rather than relying on top-down model portfolios or product-led allocations.</>),
        },
        {
            image: Abstraction,
            title: (
                <>
                    Alignment of <span style={{ fontFamily: 'GTMI' }}>Ownership</span>
                </>
            ),
            description: (<>Every family reaches an inflection point-where wealth becomes complex and legacy structures are no longer compatible. At Inflection, we integrate investments with tax strategy, estate planning, philanthropy, governance, and next generation stewardship-turning a fragmented financial world into one cohesive ecosystem. As a partner-owned firm, our incentives remain fully aligned with yours across generations. </>),
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
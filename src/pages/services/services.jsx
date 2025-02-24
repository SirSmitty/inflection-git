import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./services.css";
import HeaderComponent from "../../components/header/header"; // Import HeaderComponent
import FooterComponent from "../../components/footer/footer";

const dataSet = [
    {
        legendLabel: "Rising \nGeneration",
        magnitude: 14.2,
        info: [
            "Rising Gen Investment Philosophy vs. Family",
            "Family Business Succession Planning",
            "Family Board Involvement",
            "Marriage & Prenuptial Agreements",
            "Life & Career Coaching"
        ]
    },
    {
        legendLabel: "Philanthropy",
        magnitude: 14.2,
        info: [
            "Foundation Investment Allocation",
            "Grant Analysis",
            "Impact Alignment",
            "Vehicle Structuring/Formation"
        ]
    },
    {
        legendLabel: "Family \nGovernance \n& Succession",
        magnitude: 14.2,
        info: [
            "Family Business Structures/Restructures",
            "Rising Generation Education",
            "Generational Legacy Success",
            "Documenting Family Legacy",
        ]
    },
    {
        legendLabel: "Lifestyle",
        magnitude: 14.2,
        info: [
            "Travel & Concierge",
            "Private Aviation",
            "Collectible Insurance/Assessment",
            "Health & Wellness",
            "Project Management"
        ]
    },
    {
        legendLabel: "Investment \nProcess",
        magnitude: 14.2,
        info: [
            "Overall Investment Asset Allocation",
            "Tactical Allocation",
            "Concentrated Equity",
            "Hedging Strategies",
            "Completion Portfolio",
            "Alternative Portfolio Optimization",
            "Co-Investment Opportunities"
        ]
    },
    {
        legendLabel: "Trust, Tax \nand Estate \nPlanning",
        magnitude: 14.2,
        info: [
            "Investment coordination with Family Plan",
            "Tax Minimization and Mitigation Strategies",
            "Estate Planning",
            "Document Storage",
        ]
    },
    {
        legendLabel: "Financial \nReporting",
        magnitude: 14.2,
        info: [
            "Performance Reporting",
            "Alternatives K-1 Aggregation",
            "Balance Sheet & Cash Flow",
            "Document Storage",
            "Private Banking",
            "Borrowing & Mortgages"
        ]
    }
];

const ServicesChart = () => {
    const chartRef = useRef();
    const currentRotation = useRef(0); // Use ref instead of state
    const currentExpanded = useRef(null); // Use ref instead of state
    const [isMobile, setIsMobile] = useState(false);
    const [openSection, setOpenSection] = useState(null);



    // Initialize the pie chart
    useEffect(() => {
        const container = chartRef.current;

        const updateDimensions = () => {
            const canvasWidth = container.clientWidth;
            const canvasHeight = container.clientHeight;
            // Dynamically calculate chart dimensions based on screen size
            const baseSize = Math.min(canvasWidth, canvasHeight);
            const outerRadius = baseSize / (window.innerWidth >= 1440 ? 3 : window.innerWidth >= 1200 ? 3.2 : 3.4);
            const expandedRadius = baseSize / (window.innerWidth >= 1440 ? 1.5 : window.innerWidth >= 1200 ? 1.6 : 1.7);
            const innerRadius = baseSize / (window.innerWidth >= 1440 ? 10 : window.innerWidth >= 1200 ? 11 : 12);


            // Default and highlight colors
            const highlightColor = "#004631";


            d3.select(chartRef.current).select("svg").remove(); // Remove previous SVG before re-rendering

            const svg = d3.select(chartRef.current)
                .append("svg")
                .attr("width", canvasWidth)
                .attr("height", canvasHeight);

            // Append gradient definitions inside the SVG
            const defs = svg.append("defs");

            // Define a radial gradient for the default state
            const gradient = defs.append("radialGradient")
                .attr("id", "sliceGradient")
                .attr("cx", "85%")
                .attr("cy", "70%")
                .attr("r", "100%");

            // Add color stops
            gradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "#0a3d2a");  // Darker center

            gradient.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "#2aba8e");  // Lighter edges

            const vis = svg.append("g")
                .attr("transform", `translate(${canvasWidth / 2}, ${canvasHeight / 2}) rotate(14.2)`);

            const pie = d3.pie()
                .value(d => d.magnitude)
                .sort(null)
                .padAngle(0.02);

            const arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

            const arcs = vis.selectAll(".slice")
                .data(pie(dataSet))
                .enter()
                .append("g")
                .attr("class", "slice");

            arcs.append("path")
                .attr("fill", (d, i) => (i === 1 ? highlightColor : "url(#sliceGradient)")) // Apply gradient
                .attr("stroke-width", "0px") // Remove stroke
                .attr("d", arc)
                .each(function (d, i) { d.index = i; }) // Store index
                .on("click", function (event, d) {
                    if (currentExpanded.current === d.index) {
                        closeSlice(d3.select(this).datum(), this);
                        return;
                    }
                    if (currentExpanded.current !== null) {
                        const currentSliceIndex = currentExpanded.current;
                        const currentSliceGroup = d3.select(arcs.nodes()[currentSliceIndex]);
                        const currentSlice = currentSliceGroup.datum();
                        if (currentSlice) {
                            closeSlice(currentSlice, currentSliceGroup.select("path").node(), () => {
                                startNewAnimation(d, this);
                            });
                        } else {
                            startNewAnimation(d, this);
                        }
                    } else {
                        startNewAnimation(d, this);
                    }
                });

            // Add Stationary Center Title
            svg.append("text")
                .attr("class", "center-title")
                .attr("x", canvasWidth / 2)
                .attr("y", canvasHeight / 2 - 10) // Adjust positioning
                .attr("text-anchor", "middle")
                .style("fill", "white")
                .style("font-family", "GTMI")
                .style("font-size", "1.25vw")
                .style("font-weight", "bold")
                .text("Inflection &")
                .append("tspan") // Add second line
                .attr("x", canvasWidth / 2)
                .attr("dy", "1.2em")
                .text("Your Family");

            const labels = arcs.append("text")
                .attr("class", "slice-label")
                .attr("text-anchor", "middle")
                .style("fill", "white")
                .style("font-size", "1vw")
                .style("font-family", "GTMI")
                .style("letter-spacing", "0.75px")
                .each(function (d) {
                    const textElement = d3.select(this);
                    const c = arc.centroid(d);

                    // Break text into lines based on "\n"
                    const lines = d.data.legendLabel.split("\n");
                    const lineHeight = 16; // Adjust for spacing

                    // Position text in the center of the slice
                    textElement.attr("transform", `translate(${c[0]}, ${c[1]}) rotate(-14.2)`);

                    // Append each line separately using <tspan>
                    lines.forEach((line, i) => {
                        textElement.append("tspan")
                            .attr("x", 0)
                            .attr("y", i * lineHeight - (lines.length - 1) * lineHeight / 2) // Center the text vertically
                            .text(line);
                    });
                });

            function startNewAnimation(d, element) {
                const targetRotation = calculateShortestRotation(d.index);
                rotateChart(targetRotation, () => expandSlice(d, element));
            }

            function calculateShortestRotation(targetIndex) {
                const slices = dataSet.length;
                const sliceAngle = 360 / slices;
                let targetAngle = sliceAngle * (1 - targetIndex);
                const rotationDiff = targetAngle - currentRotation.current;

                if (rotationDiff > 180) targetAngle -= 360;
                else if (rotationDiff < -180) targetAngle += 360;

                return targetAngle;
            }


            function rotateChart(targetRotation, callback) {
                const interpolateRotation = d3.interpolate(currentRotation.current, targetRotation);

                vis.transition()
                    .duration(800) // Smooth rotation
                    .ease(d3.easeSinInOut)
                    .attrTween("transform", function () {
                        return function (t) {
                            const newRotation = interpolateRotation(t);
                            return `translate(${canvasWidth / 2}, ${canvasHeight / 2}) rotate(${newRotation + 14.2})`;
                        };
                    })
                    .on("end", function () {
                        currentRotation.current = targetRotation;
                        updateSliceColors(); // 🔹 Apply color transition only after rotation ends
                        if (callback) callback();
                    });

                labels.transition()
                    .duration(800)
                    .ease(d3.easeSinInOut)
                    .attrTween("transform", function (d) {
                        const c = arc.centroid(d);
                        return function (t) {
                            const newRotation = interpolateRotation(t);
                            return `translate(${c[0]}, ${c[1]}) rotate(${-newRotation - 14.2})`;
                        };
                    });
            }

            function updateSliceColors() {
                const slices = dataSet.length;
                const sliceAngle = 360 / slices;

                // Find which slice is in the "highlighted" position (position `1`)
                let highlightedIndex = (1 - Math.round(currentRotation.current / sliceAngle) + slices) % slices;

                arcs.selectAll("path")
                    .transition()
                    .duration(500) // Smooth color transition
                    .attrTween("fill", function (d, i) {
                        if (d.index === highlightedIndex || currentExpanded.current === d.index) {
                            return function (t) {
                                return d3.interpolate("url(#sliceGradient)", highlightColor)(t);
                            };
                        } else {
                            return function (t) {
                                return d3.interpolate(highlightColor, "url(#sliceGradient)")(t);
                            };
                        }
                    });
            }

            function expandSlice(d, element) {
                currentExpanded.current = d.index; // Update ref instead of state

                d3.select(element)
                    .transition()
                    .duration(500)
                    .attr("d", d3.arc().innerRadius(innerRadius).outerRadius(expandedRadius)(d))
                    .on("end", () => {
                        updateSliceColors();
                        addBulletPoints(d, element);
                    });
            }

            function addBulletPoints(d, element) {
                // Remove any previous info-group
                d3.select(chartRef.current).select(".info-group").remove();

                // Instead of appending to the main SVG, append to the specific slice group
                const sliceGroup = d3.select(element.parentNode);

                const infoGroup = sliceGroup
                    .append("g")
                    .attr("class", "info-group");

                // Calculate the slice's available space
                const angle = (d.endAngle - d.startAngle);
                const sliceRadius = expandedRadius - innerRadius;

                // Calculate maximum width based on the slice's arc
                const availableWidth = Math.min(
                    2 * (expandedRadius - innerRadius) * Math.sin(angle / 2),
                    2 * ((expandedRadius + innerRadius) / 2) * Math.sin(angle / 2)
                ) * 0.7;

                const textContainer = infoGroup
                    .append("g")
                    .attr("class", "text-container");

                // Calculate optimal font size
                const contentLength = d.data.info.reduce((acc, text) => acc + text.length, 0);
                const baseFontSize = Math.min(
                    1,
                    (availableWidth / contentLength) * 2
                );

                const fontSize = `${baseFontSize}vw`;
                // Calculate dynamic line height based on screen width
                const baseLineHeightMultiplier = window.innerWidth >= 1440 ? 20 :
                    window.innerWidth >= 1200 ? 16 :
                        window.innerWidth >= 992 ? 14 : 12;
                const lineHeight = baseFontSize * baseLineHeightMultiplier;

                function getTextWidth(text, fontSize) {
                    const tempText = textContainer.append("text")
                        .style("font-size", fontSize)
                        .text(text);
                    const width = tempText.node().getComputedTextLength();
                    tempText.remove();
                    return width;
                }

                function wrapText(text, maxWidth) {
                    const words = text.split(/\s+/);
                    let lines = [];
                    let currentLine = "";

                    words.forEach(word => {
                        const testLine = currentLine + (currentLine ? " " : "") + word;
                        const testWidth = getTextWidth(testLine, fontSize);

                        if (testWidth > maxWidth && currentLine) {
                            lines.push(currentLine);
                            currentLine = word;
                        } else {
                            currentLine = testLine;
                        }
                    });

                    if (currentLine) {
                        lines.push(currentLine);
                    }

                    return lines;
                }

                // Calculate position relative to the slice
                const midAngle = (d.startAngle + d.endAngle) / 2;
                const textRadius = innerRadius + (sliceRadius * 0.5);

                // Position text container relative to the slice
                textContainer
                    .attr("transform", `rotate(${(midAngle * 180 / Math.PI) - 90})`);

                // Calculate total height needed
                const wrappedItems = d.data.info.map(text => wrapText(text, availableWidth));
                const totalHeight = wrappedItems.reduce((acc, lines) => acc + (lines.length * lineHeight), 0);

                let currentY = -totalHeight / 2;

                // Render text with bullets
                wrappedItems.forEach((lines, itemIndex) => {
                    lines.forEach((line, lineIndex) => {
                        const textElement = textContainer
                            .append("text")
                            .attr("class", "info-text")
                            .attr("y", currentY)
                            .attr("transform", `translate(${textRadius}, 0)`)
                            .style("fill", "#c5e6e1")
                            .style("font-size", fontSize)
                            .style("opacity", 0);

                        if (lineIndex === 0) {
                            textElement
                                .append("tspan")
                                .text("• ")
                                .attr("dx", "0");
                        }

                        const xOffset = lineIndex === 0 ? 0 : 25;

                        textElement
                            .append("tspan")
                            .text(line)
                            .attr("dx", xOffset);

                        textElement
                            .transition()
                            .duration(500)
                            .style("opacity", 1);

                        currentY += lineHeight;
                    });

                    currentY += lineHeight * 0.3;
                });
            }

            function closeSlice(d, element, callback) {
                if (!d || !element) {
                    console.warn("closeSlice called with invalid parameters:", d, element);
                    return;
                }

                if (typeof d.startAngle !== "number" || typeof d.endAngle !== "number") {
                    console.warn("closeSlice aborted due to missing angle data:", d);
                    return;
                }

                const collapsedArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

                // Step 1: Fade out bullet points smoothly before shrinking the slice
                d3.select(".info-group")
                    .transition()
                    .duration(300)
                    .ease(d3.easeSinInOut)
                    .style("opacity", 0)
                    .on("end", function () {
                        d3.select(this).remove(); // Remove text after fade-out

                        // Step 2: Shrink the slice back to its original size
                        d3.select(element)
                            .transition()
                            .duration(300) // Smooth shrinking
                            .ease(d3.easeSinInOut)
                            .attrTween("d", function () {
                                const interpolate = d3.interpolate(expandedRadius, outerRadius);
                                return function (t) {
                                    return collapsedArc({
                                        ...d,
                                        outerRadius: interpolate(t),
                                    });
                                };
                            })
                            .on("end", function () {
                                if (currentExpanded.current === d.index) {
                                    currentExpanded.current = null;
                                }
                                updateSliceColors(); // Restore colors after shrink
                                if (callback) callback();
                            });
                    });
            }
        }
        // Initial render
        updateDimensions();

        // Add resize listener
        window.addEventListener('resize', updateDimensions);

        // Cleanup
        return () => window.removeEventListener('resize', updateDimensions);


    }, []);



    // Check if the screen is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Check on initial render
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // Toggle accordion section
    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <>
            <header className="services-fixed-header">
                <HeaderComponent />
            </header>

            <div className="services-container">
                <h1 className="services-title">Our Services</h1>

                {isMobile ? (
                    <div className="accordion-container">
                        {dataSet.map((item, index) => (
                            <div key={index} className={`accordion-item ${openSection === index ? "open" : ""}`}>
                                <div className="accordion-header" onClick={() => toggleSection(index)}>
                                    <span>{item.legendLabel}</span>
                                    <span className="accordion-icon">{openSection === index ? "−" : "+"}</span>
                                </div>
                                <div className="accordion-content">
                                    {item.info.map((point, i) => (
                                        <p key={i}>{point}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="chart-container" ref={chartRef}></div> // Keep the pie chart for larger screens
                )}
            </div>

            <FooterComponent />
        </>
    );
};

export default ServicesChart;
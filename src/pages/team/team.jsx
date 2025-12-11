import React, { useEffect, useState } from 'react';
import './team.css';

import HeaderComponent from '../../components/header/header';
import FooterComponent from '../../components/footer/footer';
import justin from '../../assets/mainInfo/portfolio/poi1.png';
import katie from '../../assets/mainInfo/portfolio/poi2.png';
import patrick from '../../assets/mainInfo/portfolio/patrickHayes.jpg';
import sophia from '../../assets/mainInfo/portfolio/SOPHIA.jpg';
import Yvonne from '../../assets/mainInfo/portfolio/Yvonne2.jpg';
const people = [
    {
        name: 'Justin Kunz',
        title: 'CEO | Founding Partner',
        headshot: justin,
        bio: `<span style="font-family:'GTMI'; font-weight:bold;">Justin Kunz</span> is the CEO and Founding Partner of Inflection Capital Management, where he leads the firm’s business, investment strategy and manages client relationships. With two decades of experience in wealth management and family office services, Justin has built a reputation for providing personalized solutions and strategic guidance to ultra-high-net-worth families and institutions.

Justin began his career in 2005 and in 2007, started working at Fidelity Investments, where he played a pivotal role in establishing the West Coast presence of Fidelity’s Family Office team. During his tenure, he oversaw over $20 billion in client assets, offering investment expertise, bespoke private market allocations, and comprehensive asset safeguarding services.

Following Fidelity, Justin joined BlackRock as Head of the West Coast Family Office team, where he also contributed to the firm’s national family office strategy. At BlackRock, he partnered with institutional families and family offices to deliver the full spectrum of the firm's investment capabilities. His approach emphasized data-driven insights and dynamic portfolio management across all asset classes, including public equity, fixed income, hedge funds, private equity, venture capital, private credit, real estate, and risk and tax mitigation strategies.

Justin earned a degree in Economics from the Eller College of Business at the University of Arizona, where he served on the Student Advisory Board and was captain of the men’s Rugby team. He remains deeply committed to philanthropy, actively supporting foundations dedicated to youth athletics in the Bay Area. Additionally, he provides consultation and contributes to the stewardship of Graeagle, California.

Justin resides in Marin, California, with his wife, Lindsay, and their two children. `
    },
    {
        name: 'Katie Riley Mahany',
        title: 'Managing Partner',
        headshot: katie, // replace with real path
        bio: `<span style="font-family:'GTMI'; font-weight:bold;">Katie Riley Mahany</span> is a Managing Partner at Inflection Capital Management, playing a key role supporting strategic client relationships, business strategy and operations.

Katie joined Inflection from BlackRock, where, in 2019 she began her tenure as an Analyst in the Institutional Client Business. Because of her deep client relationships and penchant for leadership, she grew to lead relationship manager for key family office and foundation clients, overseeing a portfolio totaling over $5.6 billion by 2024. Throughout her time at BlackRock, Katie helped to deliver investment solutions across public and private markets to her clients, with a focus on risk management and tax mitigation. Katie was recognized for creating and leading mentorship programs for junior team members, enhancing both team development and client service across the firm, something she is proud to bring to the team at Inflection.

Katie has always had a passion for education, having earned recognition as a Fulbright Scholar, teaching English in Madrid, Spain from 2014-2015, where she honed her communication skills and global perspective. She spent her early career working in education in both the US and Europe, teaching and tutoring high school students in language, reading and study skills. Katie brings an educational lens to work every day, focusing on providing clarity to her clients with empathy and financial acumen through even the most complex processes.  

Katie graduated with a BA in Political Science and Spanish from College of the Holy Cross, Phi Beta Kappa, magna cum laude. She also received her MSc in Business Management from Trinity College Dublin in 2017, with distinction. `
    },
    {
        name: 'Patrick Hayes',
        title: 'Chief Compliance Officer',
        headshot: patrick,
        bio: `<span style="font-family:'GTMI'; font-weight:bold;">Patrick Hayes</span> oversees Inflection's compliance and legal requirements including regulatory filings and the compliance program.
    
    Patrick conducts due diligence and monitors the activities of sub-advisers, third-party managers, and relevant service providers, and will assist with matters before the Securities and Exchange Commission, Commodity Futures Trading Commission, Department of Justice, Financial Industry Regulatory Authority, North American Securities Administrators Association, as well as before state securities commissions, attorneys general and local authorities.
    
    Patrick is a Magna cum laude graduate from the University of Notre Dame with a Bachelor of Arts in English.  He earned his J.D. from the University of Cincinnati College of Law, where he was inducted into the Order of the Barristers for outstanding ability in appellate advocacy.  He is also the immediate Past President of the University of Cincinnati Law Alumni Association and a graduate of the Class 8 of the Cincinnati USA Regional Chamber’s C-Change Leadership Program.`
    },
    {
        name: 'Sophia Mura',
        title: 'Client Experience Associate',
        headshot: sophia,
        bio: `<span style="font-family:'GTMI'; font-weight:bold;">Sophia Mura</span> is a Client Experience Associate at Inflection Capital Management, where she supports the partners in managing strategic client relationships, business strategy, and operations.
    
    She began her career at BlackRock on the Americas Institutional Business team, where she spent two years developing deep expertise in relationship management and asset allocation. In this role, she worked with institutional investors including family offices, foundations, endowments, and healthcare systems to deliver tailored investment solutions across equities, fixed income, real estate, private equity, and hedge funds.  While at BlackRock, Sophia helped lead the Young Allocators group, fostering connections among emerging leaders in the institutional investing space. She was also an active member of BlackRock’s Financial Inclusion Team, partnering with Bay Area foundations to advance financial literacy initiatives.
 
 Sophia holds a BA in Public Health and Public Policy from the University of California, Berkeley.  `
    },
    {
        name: 'Yvonne Freeman',
        title: 'Client Service & Operations Associate',
        headshot: Yvonne,
        bio: `<span style="font-family:'GTMI'; font-weight:bold;">Yvonne Freeman</span> is the Client Service and Operations Associate at Inflection Capital Management, assisting the management team with client relations and operational support.

Yvonne began her career in 2019 as an Operations Analyst at the UCLA Investment Company, where she supported treasury and accounting functions for a portion of the university’s endowment. In 2022, she transitioned into the family office space, joining Vibrato Capital as an Operations Associate.

She holds a BA in Psychology from the University of Colorado and earned a Personal Financial Planning certificate with distinction from UCLA Extension.`
    },
];


// Detects mobile by width (default 768px)
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= breakpoint);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
}

// slug helper for unique ids from names
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const TeamCard = ({ person, isMobile, activeSection, toggleDescription }) => {
    const sectionId = person.sectionId || slug(person.name);
    const isOpen = activeSection === sectionId;

    return (
        <article className={`team-card ${sectionId}-container`} aria-label={`${person.name} — ${person.title}`}>
            <div className="team-card__media">
                <img src={person.headshot} alt={`${person.name} headshot`} loading="lazy" />
            </div>

            <div className="team-card__footer">
                <h3 className="team-card__name">{person.name}</h3>
                <p className="team-card__title">{person.title}</p>
            </div>

            {/* Desktop/tablet hover overlay kept as-is */}
            <div className="team-card__bio" aria-hidden="true">
                <div
                    className="team-card__bio-content"
                    dangerouslySetInnerHTML={{ __html: person.bio }}
                />
            </div>

            {/* Mobile: accordion appears BETWEEN title and button */}
            {isMobile && (
                <>
                    <div
                        className={`mobile-bio ${isOpen ? 'open' : ''}`}
                        aria-hidden={!isOpen}
                        aria-expanded={isOpen}
                    >
                        <div
                            className="mobile-bio__content"
                            dangerouslySetInnerHTML={{ __html: person.bio }}
                        />
                    </div>

                    <div className="read-bio-button">
                        <button onClick={() => toggleDescription(sectionId)}>
                            {isOpen ? '− Read Less' : '+ Read Bio'}
                        </button>
                    </div>
                </>
            )}
        </article>
    );
};

const Team = () => {
    const isMobile = useIsMobile();
    const [activeSection, setActiveSection] = useState(null);

    const toggleDescription = (sectionId) => {
        setActiveSection((prevSection) => {
            const isClosing = prevSection === sectionId;
            const newSection = isClosing ? null : sectionId;

            if (isClosing) {
                // scroll back to the top of the card after a short delay
                setTimeout(() => {
                    const elementClass = `${sectionId}-container`;
                    const el = document.querySelector(`.${elementClass}`);
                    if (el) {
                        const elementTop = el.getBoundingClientRect().top + window.scrollY;
                        const offset = 50;
                        window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
                    }
                }, 300);
            }
            return newSection;
        });
    };

    return (
        <>
            <header className="team-fixed-header">
                <HeaderComponent />
            </header>

            <main className="team-container">
                {/* Header section */}
                <section className="team-hero">
                    <h1 className="team-title">Our Team</h1>
                </section>

                <section className="team-wrapper">

                    {/* Grid of people */}
                    <section className="team-grid" aria-label="Team members">
                        {people.map((p) => (
                            <TeamCard
                                key={p.name}
                                person={p}
                                isMobile={isMobile}
                                activeSection={activeSection}
                                toggleDescription={toggleDescription}
                            />
                        ))}
                    </section>


                    <section className="joint-venture-TOC" aria-label="Joint Venture: Inflection & TOC 23">
                        <h2>Joint Venture: Inflection &amp; TOC-23</h2>
                        <p>
                            This partnership of Inflection and TOC-23 is the continuation of decades of work together across a cohesive team with complementary strengths covering
                            investment management, estate planning, business transition advisory, and family office services. By combining our expertise, we provide clients with a single,
                            coordinated team that understands the full picture — financial, personal, and generational.
                        </p>

                        <div className="jv-roles">
                            <div className="jv-col">
                                <h3>Chief Executive Officer: <span style={{ fontFamily: 'GTMI' }}> Matt Blind, CFA</span></h3>
                                <ul>
                                    <li>16 years experience: Bramalea Partners (founder), Fidelity Family Office, TortoiseEcofin, Kraft Foods, US Army</li>
                                    <li>Education: West Point (BS), US Army Ranger School, Sapper School, Airborne School</li>
                                </ul>

                                <h3>Chief Operating Officer: <span style={{ fontFamily: 'GTMI' }}> Phil Ierardi</span> </h3>
                                <ul>
                                    <li>30 years experience: Eton Solutions, Fidelity Family Office</li>
                                    <li>Education: Providence College (BS)</li>
                                </ul>

                                <h3>Chief Investment Officer:<span style={{ fontFamily: 'GTMI' }}> Chris Workman, CFA</span> </h3>
                                <ul>
                                    <li>25 years experience: Michael Dell Family Office (MSD Capital), Campfire Capital, KKR, Goldman Sachs, Alpine Investors, US Army</li>
                                    <li>Education: Princeton University (AB, cum laude), University of Michigan Law School &amp; Ross School of Business (JD/MBA)</li>
                                </ul>
                                <h3>Chief Planning Officer: <span style={{ fontFamily: 'GTMI' }}>Jim Machinchick, CFP, CPWA </span></h3>
                                <ul>
                                    <li>17 years experience: Lake Street Advisors, Fidelity Investments</li>
                                    <li>Education: University of New Hampshire (BS)</li>
                                </ul>
                            </div>

                            <div className="jv-col">

                                <h3>Managing Director, Research: <span style={{ fontFamily: 'GTMI' }}> Hunter Steadley, CFA, CFP, CAIA</span></h3>
                                <ul>
                                    <li>13 years experience: Lake Street Advisors, Johnson Financial Group, Personal Capital, NY Life, Morgan Stanley</li>
                                    <li>Education: Elon University</li>
                                </ul>

                                <h3>Director, Wealth Strategy: <span style={{ fontFamily: 'GTMI' }}> Sam Stanton</span></h3>
                                <ul>
                                    <li>6 years experience: Lake Street Advisors, Morgan Stanley, Eaton Vance Investment Company</li>
                                    <li>Education: University of New Hampshire (BS)</li>
                                </ul>

                                <h3>Non-executive Chairman: <span style={{ fontFamily: 'GTMI' }}>Chris di Bonaventura </span></h3>
                                <ul>
                                    <li>30 years experience: Senior Partner Andalusian Credit Partners, EVP Fidelity Family Office Services, EVP Citi Family Office, Morgan Stanley PWM</li>
                                    <li>Education: Yale University (BA), NYU (MBA)</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>
            </main>

            <FooterComponent />
        </>
    );
};

export default Team;
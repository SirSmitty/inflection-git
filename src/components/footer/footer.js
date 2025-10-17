import React from 'react'
import PDFdisc1 from './ADVpt3.pdf';
import PDFdisc2 from './CRSForm2.pdf';
import './footer.css';
import bg from '../../assets/footerbg.jpg'

const FooterComponent = () => {
    return (
        <div className="footer-section" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer-row">
                <p>Disclosure: </p>
                <div className='pdf-container'>
                    <span className="footer-item">San Francisco, CA</span>
                    <a href={PDFdisc1} className="footer-item" target="_blank" rel="noopener noreferrer">
                        ADV Part 2A
                    </a>
                    <a href={PDFdisc2} className="footer-item" target="_blank" rel="noopener noreferrer">
                        Form CRS
                    </a>
                    <a href='/privacy-policy' className="footer-item" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                    </a>
                </div>
            </div>
            <div className="footer-disclosure">
                <p>
                    Information presented is for informational purposes only. Inflection Capital Management, LLC
                    (“Inflection”) is a registered investment adviser. Registration as an investment adviser does not imply a certain
                    level of skill or training. Past performance is not indicative of future results. Investing involves risk,
                    including the possibility of loss of principal. The ideas and opinions expressed herein do not constitute legal,
                    tax, or investment advice or a recommendation of any particular security or strategy. Before making any investment
                    decision, you should seek expert, professional advice and obtain information regarding the legal, fiscal,
                    regulatory and foreign currency requirements for any investment according to the laws of your home country and
                    place of residence. Any forward-looking statements or forecasts are based on assumptions and actual results may
                    vary. Information presented from third parties is believed to be reliable, but no warranty is provided. Inflection
                    is not required to update information presented, unless otherwise required by applicable law. For more information
                    about Inflection, including our Form ADV Part 2A Brochure, please visit{" "}
                    <a href="https://adviserinfo.sec.gov/firm/summary/333157" target="_blank" rel="noopener noreferrer">
                        https://adviserinfo.sec.gov/firm/summary/333157
                    </a>{" "}
                    or contact us at (415) 805-8682.
                </p>
            </div>
        </div>
    );
};

export default FooterComponent;
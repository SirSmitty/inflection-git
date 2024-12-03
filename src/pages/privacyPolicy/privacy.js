import React from "react";
import './privacy.css';
import FooterComponent from "../../components/footer/footer";

function PrivacyPolicy() {
    return (
        <>

            <div className="privacy-policy-container">
                <h1 className="privacy-title">PRIVACY NOTICE REGARDING CLIENT PRIVACY</h1>
                <p>
                    Maintaining the trust and confidence of our clients is a high priority. That is why we want you to understand how we protect
                    your privacy when we collect and use information about you, and the steps that we take to safeguard that information. This
                    notice is provided to you on behalf of Inflection Capital Management, LLC.
                </p>

                <h2>Information We Collect:</h2>
                <p>
                    In connection with providing investment products, financial advice, or other services, we obtain non-public personal information
                    about you, including:
                </p>
                <ul>
                    <li>
                        Information we receive from you on account applications or questionnaires, such as your address, date of birth, Social Security
                        Number, occupation, financial goals, assets and income;
                    </li>
                    <li>Information about your transactions with us, our affiliates, or others; and</li>
                    <li>
                        Information received from credit or service bureaus or other third parties, such as your credit history or employment status.
                    </li>
                </ul>

                <h2>Categories of Information We Disclose:</h2>
                <p>
                    We may disclose all information that we collect. Inflection Capital Management, LLC and its affiliates do not sell customer lists
                    and will not sell your name to telemarketers.
                </p>

                <h2>Categories of Parties to Whom We Disclose:</h2>
                <p>
                    We will not disclose information regarding you or your account with us, except under the following circumstances:
                </p>
                <ul>
                    <li>To your authorized Investment Advisor Representative and his or her manager;</li>
                    <li>
                        Inflection Capital Management, LLC may permit Investment Advisor Representatives that terminate their affiliation with
                        Inflection Capital Management, LLC to make copies of their client files.
                    </li>
                    <li>
                        To establish or maintain an account with a third party, such as a clearing broker/dealer, investment company, or insurance
                        company providing services to you and/or our firm;
                    </li>
                    <li>To third parties who perform services on our behalf;</li>
                    <li>To your attorney, accountant, trustee or anyone else who represents you in a fiduciary capacity;</li>
                    <li>To our attorneys, accountants or auditors; and</li>
                    <li>
                        To government entities or other third parties in response to subpoenas or other legal processes as required by law or to
                        comply with regulatory inquiries.
                    </li>
                </ul>

                <h2>How We Use Information:</h2>
                <p>
                    Information may be used among the companies that perform support services for us, such as data processors, technical systems
                    consultants and programmers, or companies that help us market products and services to you for a number of purposes, such as:
                </p>
                <ul>
                    <li>To protect your accounts from unauthorized access or identity theft;</li>
                    <li>To process your requests such as securities purchases and sales;</li>
                    <li>
                        To establish or maintain an account with an unaffiliated third party, such as a clearing broker-dealer providing services
                        to you and/or Inflection Capital Management, LLC;
                    </li>
                    <li>To service your accounts, such as by issuing checks and account statements;</li>
                    <li>To comply with Federal, State, and Self-Regulatory Organization requirements; and</li>
                    <li>To keep you informed about financial services of interest to you.</li>
                </ul>

                <h2>Our Security Policy:</h2>
                <p>
                    We restrict access to nonpublic personal information about you to those individuals who need to know that information to provide
                    products or services to you and perform their respective duties. We maintain physical, electronic, and procedural security measures
                    to safeguard confidential client information.
                </p>

                <h2>Closed or Inactive Accounts:</h2>
                <p>
                    If you decide to close your account(s) or become an inactive customer, our Privacy Policy will continue to apply to you.
                </p>

                <h2>Document Retention:</h2>
                <p>
                    We follow internal retention schedules for various types of information and may dispose of certain documents after the retention
                    period expires. All confidential information that is disposed of under this policy will be redacted, pulverized or shredded so
                    that personal information cannot be read or reconstructed.
                </p>

                <h2>Complaint Notification:</h2>
                <p>
                    Please direct complaints to: Inflection Capital Management, LLC, 1 Sansome Street, Suite 3500, San Francisco, CA 94104,
                    (513) 693-4886.
                </p>

                <h2>Changes to this Privacy Policy:</h2>
                <p>
                    If we make any substantial changes in the way we use or disseminate confidential information, we will notify you. If you have any
                    questions concerning this Privacy Policy, please write to: Inflection Capital Management, LLC, 1 Sansome Street, Suite 3500, San
                    Francisco, CA 94104, (513) 693-4886.
                </p>
                <p className="footer-text">September 2024</p>
            </div>
            <FooterComponent />
        </>
    );
}

export default PrivacyPolicy;
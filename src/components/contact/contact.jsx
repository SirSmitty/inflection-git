import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

const ContactForm = () => {
    const [statusMessage, setStatusMessage] = useState('');

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
                'service_kskk7az',
                'template_j7ir5zf',
                formData,
                'pSlQYBFQMk4wsZrxw'
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
        <div className="contact-page-content" id='contact'>
            <div className='contact-background-overlay'></div>
            <div className="form-header">
                <h1 className="contact-title">
                    <span style={{ fontFamily: "RoobertoL" }}>Meet with the</span> Inflection Team
                </h1>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
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
    );
};

export default ContactForm; 
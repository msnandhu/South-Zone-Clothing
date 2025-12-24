import React from 'react';
import { useSettings } from '../context/SettingsContext';
import './Contact.css';

const Contact = () => {
    const { siteContent } = useSettings();

    return (
        <div className="contact-page container">
            <h1 className="serif-title">CONTACT US</h1>
            <div className="contact-content">
                <div className="contact-details">
                    <h3>Customer Support</h3>
                    <p>Email: {siteContent.email}</p>
                    <p>Phone: {siteContent.phone}</p>
                    <p>Hours: {siteContent.hours}</p>

                    <h3 className="mt-4">Store Location</h3>
                    <address>
                        {siteContent.address}
                    </address>
                </div>

                <div className="contact-form">
                    <h3>Send us a message</h3>
                    <form>
                        <input type="text" placeholder="Name" className="form-input" />
                        <input type="email" placeholder="Email" className="form-input" />
                        <textarea placeholder="Message" className="form-input" rows="5"></textarea>
                        <button className="btn-black">SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;

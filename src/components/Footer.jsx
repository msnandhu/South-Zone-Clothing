import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Clock } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import './Footer.css';

const Footer = () => {
    const { siteContent } = useSettings();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-column">
                    <h3 className="footer-logo">SOUTHZONE</h3>
                    <p className="footer-desc">
                        Defining modern fashion with a touch of elegance.
                        Premium clothing for the contemporary individual.
                    </p>
                    <div className="social-icons">
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                    </div>
                </div>

                <div className="footer-column">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="/shop">Shop Collection</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4 className="footer-heading">Contact Us</h4>
                    <ul className="footer-contact">
                        <li>
                            <MapPin size={18} className="contact-icon" />
                            <span>
                                {siteContent.address}
                            </span>
                        </li>
                        <li>
                            <Phone size={18} className="contact-icon" />
                            <span>{siteContent.phone}</span>
                        </li>
                        <li>
                            <Clock size={18} className="contact-icon" />
                            <span>{siteContent.hours}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 SouthZone Clothing. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

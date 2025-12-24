import React from 'react';
import { useSettings } from '../context/SettingsContext';
import './Contact.css'; // Reusing similar styles

const FAQ = () => {
    const { faqs } = useSettings();

    return (
        <div className="contact-page container">
            <h1 className="serif-title">FAQ</h1>
            <div className="faq-list" style={{ maxWidth: '800px', margin: '3rem auto', textAlign: 'left' }}>
                {faqs.map(faq => (
                    <div key={faq.id} className="faq-item mb-4">
                        <h3 className="font-bold mb-2">{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;

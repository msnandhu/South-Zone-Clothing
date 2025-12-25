import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    // Admin Credentials
    // Admin Credentials - REMOVED (Handled by Backend)

    // Contact & Support Info
    const [siteContent, setSiteContent] = useState({
        email: 'support@southzone.com',
        phone: '+91 73971 33761',
        hours: 'Mon - Sun | 10:00 AM – 9:30 PM',
        address: 'Kadambanagar, Pattinamkattan,\nRamanathapuram, Tamil Nadu – 623503'
    });

    // FAQs
    const [faqs, setFaqs] = useState([
        { id: 1, question: 'How long does shipping take?', answer: 'Orders are typically processed within 1-2 business days. Standard shipping takes 3-5 business days within India.' },
        { id: 2, question: 'What is your return policy?', answer: 'We accept returns within 7 days of delivery. Items must be unworn and with original tags.' },
        { id: 3, question: 'Do you offer international shipping?', answer: 'Currently, we only ship within India. Stay tuned for updates!' }
    ]);

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await api.get('/settings');
            if (data) {
                if (data.siteContent) setSiteContent(data.siteContent);
                if (data.faqs && data.faqs.length > 0) setFaqs(data.faqs);
            }
        };
        fetchSettings();
    }, []);

    const saveSettings = async (newSettings) => {
        try {
            await api.post('/settings', newSettings);
        } catch (error) {
            console.error('Failed to save settings:', error);
            alert('Failed to save settings');
        }
    };

    const updateSiteContent = (content) => {
        setSiteContent(content);
        saveSettings({ siteContent: content });
    };

    const addFaq = (faq) => {
        const newFaqs = [...faqs, { ...faq, id: Date.now() }];
        setFaqs(newFaqs);
        saveSettings({ faqs: newFaqs });
    };

    const updateFaq = (id, updatedFaq) => {
        const newFaqs = faqs.map(f => f.id === id ? { ...f, ...updatedFaq } : f);
        setFaqs(newFaqs);
        saveSettings({ faqs: newFaqs });
    };

    const deleteFaq = (id) => {
        const newFaqs = faqs.filter(f => f.id !== id);
        setFaqs(newFaqs);
        saveSettings({ faqs: newFaqs });
    };

    return (
        <SettingsContext.Provider value={{
            siteContent,
            updateSiteContent,
            faqs,
            addFaq,
            updateFaq,
            deleteFaq
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

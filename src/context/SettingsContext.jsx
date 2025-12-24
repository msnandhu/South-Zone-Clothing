import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    // Admin Credentials
    const [adminCredentials, setAdminCredentials] = useState(() => {
        const saved = localStorage.getItem('adminCredentials');
        const defaultCreds = {
            email: 'admin@southzone.com',
            password: 'admin123',
            adminPhone: '+919876543210'
        };
        return saved ? { ...defaultCreds, ...JSON.parse(saved) } : defaultCreds;
    });

    // Contact & Support Info
    const [siteContent, setSiteContent] = useState(() => {
        const saved = localStorage.getItem('siteContent');
        return saved ? JSON.parse(saved) : {
            email: 'support@southzone.com',
            phone: '+91 73971 33761',
            hours: 'Mon - Sun | 10:00 AM – 9:30 PM',
            address: 'Kadambanagar, Pattinamkattan,\nRamanathapuram, Tamil Nadu – 623503'
        };
    });

    // FAQs
    const [faqs, setFaqs] = useState(() => {
        const saved = localStorage.getItem('faqs');
        return saved ? JSON.parse(saved) : [
            { id: 1, question: 'How long does shipping take?', answer: 'Orders are typically processed within 1-2 business days. Standard shipping takes 3-5 business days within India.' },
            { id: 2, question: 'What is your return policy?', answer: 'We accept returns within 7 days of delivery. Items must be unworn and with original tags.' },
            { id: 3, question: 'Do you offer international shipping?', answer: 'Currently, we only ship within India. Stay tuned for updates!' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
    }, [adminCredentials]);

    useEffect(() => {
        localStorage.setItem('siteContent', JSON.stringify(siteContent));
    }, [siteContent]);

    useEffect(() => {
        localStorage.setItem('faqs', JSON.stringify(faqs));
    }, [faqs]);

    const updateAdminCredentials = (credentials) => {
        setAdminCredentials(credentials);
    };

    const updateSiteContent = (content) => {
        setSiteContent(content);
    };

    const addFaq = (faq) => {
        setFaqs(prev => [...prev, { ...faq, id: Date.now() }]);
    };

    const updateFaq = (id, updatedFaq) => {
        setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updatedFaq } : f));
    };

    const deleteFaq = (id) => {
        setFaqs(prev => prev.filter(f => f.id !== id));
    };

    return (
        <SettingsContext.Provider value={{
            adminCredentials,
            updateAdminCredentials,
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

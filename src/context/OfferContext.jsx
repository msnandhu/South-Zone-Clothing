import React, { createContext, useContext, useState, useEffect } from 'react';

const OfferContext = createContext();

export const useOffer = () => useContext(OfferContext);

const initialOffers = [
    {
        id: 1,
        title: "Summer Sale",
        discountPercentage: 20,
        description: "Get 20% off on all summer wear!",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
];

export const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState(() => {
        const savedOffers = localStorage.getItem('offers');
        return savedOffers ? JSON.parse(savedOffers) : initialOffers;
    });

    useEffect(() => {
        localStorage.setItem('offers', JSON.stringify(offers));
    }, [offers]);

    const addOffer = (offer) => {
        const newOffer = {
            ...offer,
            id: Date.now() // Simple unique ID
        };
        setOffers(prev => [...prev, newOffer]);
    };

    const deleteOffer = (id) => {
        setOffers(prev => prev.filter(offer => offer.id !== id));
    };

    return (
        <OfferContext.Provider value={{ offers, addOffer, deleteOffer }}>
            {children}
        </OfferContext.Provider>
    );
};

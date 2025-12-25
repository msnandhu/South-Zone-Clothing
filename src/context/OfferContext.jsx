import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

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
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            const data = await api.get('/offers');
            // If backend is empty, maybe we want to seed it? 
            // For now, just use what's there. 
            // If strictly following the shared logic, we could seed it if empty.
            if (data && data.length > 0) {
                setOffers(data);
            } else {
                setOffers([]);
            }
        };
        fetchOffers();
    }, []);

    const addOffer = async (offer) => {
        try {
            const newOffer = await api.post('/offers', offer);
            setOffers(prev => [...prev, newOffer]);
        } catch (error) {
            console.error('Failed to add offer:', error);
            alert('Failed to add offer');
        }
    };

    const deleteOffer = async (id) => {
        try {
            await api.delete(`/offers/${id}`);
            setOffers(prev => prev.filter(offer => offer.id !== id));
        } catch (error) {
            console.error('Failed to delete offer:', error);
            alert('Failed to delete offer');
        }
    };

    return (
        <OfferContext.Provider value={{ offers, addOffer, deleteOffer }}>
            {children}
        </OfferContext.Provider>
    );
};

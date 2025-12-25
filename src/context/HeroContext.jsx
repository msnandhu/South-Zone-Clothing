import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const HeroContext = createContext();

export const useHero = () => useContext(HeroContext);

export const HeroProvider = ({ children }) => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchSlides = async () => {
            const data = await api.get('/hero-slides');
            if (data) setSlides(data);
        };
        fetchSlides();
    }, []);

    const addSlide = async (imageUrl, caption = 'NEW ARRIVAL') => {
        try {
            const newSlide = await api.post('/hero-slides', { image: imageUrl, caption });
            setSlides(prev => [...prev, newSlide]);
        } catch (error) {
            console.error('Failed to add slide:', error);
            alert('Failed to add slide');
        }
    };

    const updateCaption = async (id, newCaption) => {
        try {
            const updatedSlide = await api.put(`/hero-slides/${id}`, { caption: newCaption });
            setSlides(prev => prev.map(slide => slide.id === id ? { ...slide, caption: newCaption } : slide));
        } catch (error) {
            console.error('Failed to update caption:', error);
            alert('Failed to update caption');
        }
    };

    const removeSlide = async (id) => {
        try {
            await api.delete(`/hero-slides/${id}`);
            setSlides(prev => prev.filter(slide => slide.id !== id));
        } catch (error) {
            console.error('Failed to delete slide:', error);
            alert('Failed to delete slide');
        }
    };

    const saveHeroSlides = async (newSlides) => {
        try {
            const result = await api.put('/hero-slides', newSlides);
            if (result && result.success) {
                setSlides(result.slides);
                alert('Hero slides saved successfully!');
            }
        } catch (error) {
            console.error('Failed to save slides:', error);
            alert('Failed to save slides');
        }
    };

    return (
        <HeroContext.Provider value={{ slides, addSlide, updateCaption, removeSlide, saveHeroSlides }}>
            {children}
        </HeroContext.Provider>
    );
};

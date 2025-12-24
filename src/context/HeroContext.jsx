import React, { createContext, useContext, useState, useEffect } from 'react';

const HeroContext = createContext();

export const useHero = () => useContext(HeroContext);

export const HeroProvider = ({ children }) => {
    // Initial state with the 4 local images
    const [slides, setSlides] = useState([
        { id: 1, image: '/hero1.jpg', caption: 'ELEGANCE MEETS STYLE' },
        { id: 2, image: '/hero2.jpg', caption: 'DISCOVER YOUR LOOK' },
        { id: 3, image: '/hero3.jpg', caption: 'REDEFINE FASHION' },
        { id: 4, image: '/hero4.jpg', caption: 'SHOP THE COLLECTION' }
    ]);

    // Load from localStorage on mount (persistence)
    useEffect(() => {
        const savedSlides = localStorage.getItem('heroSlides');
        if (savedSlides) {
            setSlides(JSON.parse(savedSlides));
        }
    }, []);

    // Save to localStorage whenever slides change
    useEffect(() => {
        localStorage.setItem('heroSlides', JSON.stringify(slides));
    }, [slides]);

    const addSlide = (imageUrl, caption = 'NEW ARRIVAL') => {
        const newSlide = {
            id: Date.now(),
            image: imageUrl,
            caption: caption
        };
        setSlides([...slides, newSlide]);
    };

    const updateCaption = (id, newCaption) => {
        setSlides(slides.map(slide =>
            slide.id === id ? { ...slide, caption: newCaption } : slide
        ));
    };

    const removeSlide = (id) => {
        setSlides(slides.filter(slide => slide.id !== id));
    };

    return (
        <HeroContext.Provider value={{ slides, addSlide, updateCaption, removeSlide }}>
            {children}
        </HeroContext.Provider>
    );
};

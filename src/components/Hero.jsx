import React, { useState, useEffect } from 'react';
import './Hero.css';
import { useHero } from '../context/HeroContext';

const Hero = () => {
    const { slides } = useHero();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Reset to 0 if slides change and index is out of bounds
    useEffect(() => {
        if (currentSlide >= slides.length) {
            setCurrentSlide(0);
        }
    }, [slides, currentSlide]);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides]);

    if (!slides || slides.length === 0) {
        return <div className="hero-carousel" style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>No slides available</div>;
    }

    return (
        <section className="hero-carousel">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                >
                    {/* Blurred Background Layer - Fills space */}
                    <div
                        className="slide-background"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />

                    {/* Foreground Image - Contained */}
                    <div
                        className="slide-foreground"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />

                    <div className="hero-overlay">
                        <div className="hero-content">
                            <h2 className="hero-title">{slide.caption}</h2>
                            <button className="shop-now-btn" onClick={() => window.location.href = '/shop'}>Shop Now</button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="hero-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;

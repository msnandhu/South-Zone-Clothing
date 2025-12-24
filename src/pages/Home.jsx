import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedSection from '../components/FeaturedSection';
import { useOffer } from '../context/OfferContext';

const Home = () => {
    const { offers } = useOffer();

    return (
        <div className="home-page">
            <Hero />

            {/* Offers Section */}
            {offers.length > 0 && (
                <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 className="section-title">Exclusive Offers</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {offers.map(offer => (
                            <div key={offer.id} style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', height: '250px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                <img src={offer.image} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    padding: '2rem',
                                    color: 'white'
                                }}>
                                    <span style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#ff4d4d', fontWeight: 'bold' }}>
                                        {offer.discountPercentage}% OFF
                                    </span>
                                    <h3 style={{ fontSize: '2rem', margin: '0.5rem 0', fontFamily: 'Playfair Display' }}>{offer.title}</h3>
                                    <p style={{ maxWidth: '300px', opacity: 0.9 }}>{offer.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <CategoryGrid />
            <FeaturedSection />

            {/* Instagram Follow Strip Placeholder */}
            <section style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-color)'
            }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>@SOUTHZONE_CLOTHING</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Follow us on Instagram for daily inspiration.</p>
            </section>
        </div>
    );
};

export default Home;

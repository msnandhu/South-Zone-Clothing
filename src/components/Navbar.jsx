import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, MapPin, Home, Store, Headphones, HelpCircle, Mail } from 'lucide-react';
import './Navbar.css';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar">
                <p>Follow us on Instagram <a href="https://www.instagram.com/southzone.in?igsh=MWo5MTE0Y2M2cHl4eA==" target="_blank" rel="noopener noreferrer">Learn more</a></p>
            </div>

            <header className="navbar">
                <div className="container navbar-container">

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X color="white" /> : <Menu color="white" />}
                    </button>

                    {/* Left Navigation */}
                    <nav className={`nav-links left-nav ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} title="Home"><Home size={20} /></Link>
                        <Link to="/shop" onClick={() => setIsMenuOpen(false)} title="Shop"><Store size={20} /></Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} title="Customer Support"><Headphones size={20} /></Link>
                        <Link to="/faq" onClick={() => setIsMenuOpen(false)} title="FAQ"><HelpCircle size={20} /></Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} title="Contact"><Mail size={20} /></Link>
                        <div className="mobile-only-links">
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}><User size={20} /> Login</Link>
                            <Link to="/cart" onClick={() => setIsMenuOpen(false)}><ShoppingBag size={20} /> Cart ({cartCount})</Link>
                        </div>
                    </nav>

                    {/* Centered Logo */}
                    <Link to="/" className="logo-center">
                        <img src="/southzone-logo-v2.png" alt="South Zone" className="navbar-logo-img" />
                    </Link>

                    {/* Right Icons/Links */}
                    <div className="nav-icons right-nav">
                        <Link to="/login" className="text-link" title="Login"><User size={20} /></Link>
                        <button className="text-link" onClick={() => setIsSearchOpen(true)} title="Search"><Search size={20} /></button>
                        <Link to="/cart" className="text-link" title="Cart">
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <ShoppingBag size={20} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        backgroundColor: 'var(--accent-red)',
                                        color: 'white',
                                        fontSize: '10px',
                                        borderRadius: '50%',
                                        width: '16px',
                                        height: '16px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="search-overlay">
                    <div className="search-container container">
                        <form onSubmit={handleSearch} className="search-form">
                            <Search className="search-icon" size={24} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <button type="button" className="close-search" onClick={() => setIsSearchOpen(false)}>
                                <X size={24} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;

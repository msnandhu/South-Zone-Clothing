import React, { createContext, useContext, useState, useEffect } from 'react';

import { useOffer } from './OfferContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Persist cart using localStorage
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const { offers } = useOffer();

    const addToCart = (product, quantity = 1, size = 'M') => {
        setCartItems(prevItems => {
            // Find best available offer
            const bestOffer = offers && offers.length > 0
                ? offers.reduce((prev, current) => (prev.discountPercentage > current.discountPercentage) ? prev : current)
                : null;

            const existingItem = prevItems.find(item => item.id === product.id && item.size === size);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity, appliedOffer: bestOffer }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity, size, appliedOffer: bestOffer }];
        });
    };

    const removeFromCart = (itemId, size) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === itemId && item.size === size)));
    };

    const updateQuantity = (itemId, size, itemsToAdd) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId && item.size === size
                    ? { ...item, quantity: Math.max(1, item.quantity + itemsToAdd) }
                    : item
            )
        );
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

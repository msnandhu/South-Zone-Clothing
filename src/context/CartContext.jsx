import React, { createContext, useContext, useState, useEffect } from 'react';

import { useOffer } from './OfferContext';
import { useProduct } from './ProductContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Persist cart using localStorage
        try {
            const savedCart = localStorage.getItem('cart');
            const parsedCart = savedCart ? JSON.parse(savedCart) : [];
            return Array.isArray(parsedCart) ? parsedCart : [];
        } catch (e) {
            console.error("Failed to parse cart from local storage", e);
            return [];
        }
    });

    const { products } = useProduct();

    useEffect(() => {
        // Strip heavy image data before saving
        const minimalCart = cartItems.map(item => {
            const { image, images, ...rest } = item;
            return rest;
        });
        try {
            localStorage.setItem('cart', JSON.stringify(minimalCart));
        } catch (e) {
            console.error("Failed to save cart to local storage", e);
        }
    }, [cartItems]);

    // Hydrate cart with images from products
    useEffect(() => {
        if (products && products.length > 0 && cartItems.length > 0) {
            const needsUpdate = cartItems.some(item => !item.image && !item.images);
            if (needsUpdate) {
                setCartItems(prev => prev.map(item => {
                    const product = products.find(p => p.id === item.id);
                    if (product) {
                        return { ...item, image: product.image, images: product.images };
                    }
                    return item;
                }));
            }
        }
    }, [products, cartItems.length]); // Depend on length to avoid rapid unnecessary checks, logic handles internal updates

    const { offers } = useOffer();

    const addToCart = (product, quantity = 1, size = 'M') => {
        setCartItems(prevItems => {
            // Ensure prevItems is an array
            const items = Array.isArray(prevItems) ? prevItems : [];

            // Find best available offer
            const bestOffer = offers && Array.isArray(offers) && offers.length > 0
                ? offers.reduce((prev, current) => {
                    if (!prev || !current) return prev || current;
                    return (prev.discountPercentage > current.discountPercentage) ? prev : current;
                }, null)
                : null;

            const existingItem = items.find(item => item.id === product.id && item.size === size);
            if (existingItem) {
                return items.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity, appliedOffer: bestOffer }
                        : item
                );
            }
            return [...items, { ...product, quantity, size, appliedOffer: bestOffer }];
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

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

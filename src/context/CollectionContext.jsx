import React, { createContext, useContext, useState, useEffect } from 'react';

const CollectionContext = createContext();

export const useCollection = () => useContext(CollectionContext);

export const CollectionProvider = ({ children }) => {
    // Default collections (similar to current hardcoded ones)
    const defaultCollections = [
        {
            id: 1,
            title: 'SHIRTS',
            image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1965&auto=format&fit=crop',
            link: '/shop?category=shirts'
        },
        {
            id: 2,
            title: 'PANTS',
            image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1974&auto=format&fit=crop',
            link: '/shop?category=pants'
        },
        {
            id: 3,
            title: 'T-SHIRTS',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop',
            link: '/shop?category=t-shirts'
        }
    ];

    const [collections, setCollections] = useState(() => {
        const saved = localStorage.getItem('collections');
        return saved ? JSON.parse(saved) : defaultCollections;
    });

    useEffect(() => {
        localStorage.setItem('collections', JSON.stringify(collections));
    }, [collections]);

    const addCollection = (newCollection) => {
        setCollections(prev => [...prev, { ...newCollection, id: Date.now() }]);
    };

    const deleteCollection = (id) => {
        setCollections(prev => prev.filter(c => c.id !== id));
    };

    return (
        <CollectionContext.Provider value={{ collections, addCollection, deleteCollection, setCollections }}>
            {children}
        </CollectionContext.Provider>
    );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const CollectionContext = createContext();

export const useCollection = () => useContext(CollectionContext);

export const CollectionProvider = ({ children }) => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            const data = await api.get('/collections');
            if (data) setCollections(data);
        };
        fetchCollections();
    }, []);

    const addCollection = async (newCollection) => {
        try {
            const savedCollection = await api.post('/collections', newCollection);
            setCollections(prev => [...prev, savedCollection]);
        } catch (error) {
            console.error('Failed to add collection:', error);
            alert('Failed to add collection');
        }
    };

    const deleteCollection = async (id) => {
        try {
            await api.delete(`/collections/${id}`);
            setCollections(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete collection:', error);
            alert('Failed to delete collection');
        }
    };

    return (
        <CollectionContext.Provider value={{ collections, addCollection, deleteCollection, setCollections }}>
            {children}
        </CollectionContext.Provider>
    );
};

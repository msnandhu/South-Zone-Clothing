import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['shirts', 'pants', 't-shirts']);

    // Fetch initial data
    useEffect(() => {
        const loadData = async () => {
            const fetchedProducts = await api.get('/products');
            if (fetchedProducts) setProducts(fetchedProducts);

            const fetchedCategories = await api.get('/categories');
            if (fetchedCategories) setCategories(fetchedCategories);
        };
        loadData();
    }, []);

    // Add a new product
    const addProduct = async (product) => {
        try {
            const savedProduct = await api.post('/products', product);
            setProducts(prev => [...prev, savedProduct]);
        } catch (error) {
            console.error('Failed to add product:', error);
            alert('Failed to add product');
        }
    };

    // Update an existing product
    const updateProduct = async (id, updatedFields) => {
        try {
            const updatedProduct = await api.put(`/products/${id}`, updatedFields);
            setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
        } catch (error) {
            console.error('Failed to update product:', error);
            alert('Failed to update product');
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product');
        }
    };

    const addCategory = async (categoryName) => {
        if (!categories.includes(categoryName)) {
            try {
                const updatedCategories = await api.post('/categories', { category: categoryName });
                if (updatedCategories) setCategories(updatedCategories);
            } catch (error) {
                console.error('Failed to add category:', error);
            }
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, categories, addCategory }}>
            {children}
        </ProductContext.Provider>
    );
};

import React, { createContext, useContext, useState, useEffect } from 'react';


const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    // Initialize products from localStorage or fallback to default data
    const [products, setProducts] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch products from backend
    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    // Add a new product
    const addProduct = async (product) => {
        try {
            const res = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            const newProduct = await res.json();
            setProducts(prev => [...prev, newProduct]);
        } catch (err) {
            console.error('Error adding product:', err);
        }
    };

    // Update an existing product
    const updateProduct = async (id, updatedFields) => {
        try {
            const res = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFields)
            });
            if (res.ok) {
                const updatedProduct = await res.json();
                setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
            }
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
            }
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    // Initialize categories from localStorage or fallback
    const [categories, setCategories] = useState(() => {
        const savedCategories = localStorage.getItem('categories');
        return savedCategories ? JSON.parse(savedCategories) : ['shirts', 'pants', 't-shirts'];
    });

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const addCategory = (categoryName) => {
        if (!categories.includes(categoryName)) {
            setCategories(prev => [...prev, categoryName]);
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, categories, addCategory }}>
            {children}
        </ProductContext.Provider>
    );
};

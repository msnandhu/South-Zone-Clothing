import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts as initialProducts } from '../data/products';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    // Initialize products from localStorage or fallback to default data
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    // Save to localStorage whenever products change
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    // Add a new product
    const addProduct = (product) => {
        // Use provided ID or auto-increment
        const newId = product.id
            ? Number(product.id)
            : (products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1);

        const newProduct = {
            ...product,
            id: newId,
        };
        setProducts(prev => [...prev, newProduct]);
    };

    // Update an existing product
    const updateProduct = (id, updatedFields) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    };

    // Delete a product
    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
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

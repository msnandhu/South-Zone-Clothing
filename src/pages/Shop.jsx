import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import './Shop.css';

const Shop = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { products: allProducts } = useProduct(); // Use context products

    // Initialize active filters
    const [activeFilters, setActiveFilters] = useState({
        categories: [],
        availability: [],
        size: [],
        priceMin: '',
        priceMax: ''
    });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const categoryParam = searchParams.get('category');

    // Initialize category filter from URL param if present
    useEffect(() => {
        if (categoryParam) {
            setActiveFilters(prev => ({
                ...prev,
                categories: [categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)]
            }));
        }
    }, [categoryParam]);


    const handleApplyFilters = (newFilters) => {
        setActiveFilters(newFilters);
        setIsFilterOpen(false); // Close sidebar on apply
    };

    // Filter products based on search query AND active filters
    const filteredProducts = allProducts.filter(product => {
        // Search Filter
        if (searchQuery) {
            const matchesSearch = (
                product.name.toLowerCase().includes(searchQuery) ||
                product.description?.toLowerCase().includes(searchQuery) ||
                product.category?.toLowerCase().includes(searchQuery) ||
                product.tag?.toLowerCase().includes(searchQuery)
            );
            if (!matchesSearch) return false;
        }

        // Category Filter
        if (activeFilters.categories.length > 0) {
            const productCategory = product.category || product.tag; // Heuristic mapping
            // Simple check: if product category isn't in selected list (case insensitive loose check)
            const matchesCategory = activeFilters.categories.some(c =>
                product.name.toLowerCase().includes(c.toLowerCase()) ||
                (product.category && product.category.toLowerCase().includes(c.toLowerCase()))
            );
            if (!matchesCategory) return false;
        }

        // Price Filter
        if (activeFilters.priceMin && product.price < Number(activeFilters.priceMin)) return false;
        if (activeFilters.priceMax && product.price > Number(activeFilters.priceMax)) return false;

        // Size Filter
        if (activeFilters.size.length > 0) {
            // Check if product has sizes data
            if (!product.sizes || !Array.isArray(product.sizes)) return false;

            // Allow if product has ANY of the selected sizes
            const hasMatchingSize = activeFilters.size.some(size => product.sizes.includes(size));
            if (!hasMatchingSize) return false;
        }

        return true;
    });

    return (
        <div className="shop-page container">
            <div className="shop-header">
                <h1>{searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}</h1>
                <div className="shop-controls">
                    <span className="product-count">Showing {filteredProducts.length} products</span>
                    <button className="filter-toggle-btn" onClick={() => setIsFilterOpen(true)}>
                        <SlidersHorizontal size={18} /> Filters
                    </button>
                    <select className="sort-select">
                        <option>Sort by: Newest</option>
                        <option>Sort by: Price Low to High</option>
                        <option>Sort by: Price High to Low</option>
                    </select>
                </div>
            </div>

            <div className="shop-layout">
                {/* Filter Sidebar Overlay */}
                <div className={`filter-overlay-wrapper ${isFilterOpen ? 'active' : ''}`}>
                    <div className="filter-backdrop" onClick={() => setIsFilterOpen(false)}></div>
                    <div className="filter-panel">
                        <FilterSidebar onApply={handleApplyFilters} onClose={() => setIsFilterOpen(false)} />
                    </div>
                </div>

                <div className="shop-grid full-width">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No products found matching your active filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;

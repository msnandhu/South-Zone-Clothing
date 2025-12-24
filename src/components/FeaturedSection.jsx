import React from 'react';
import ProductCard from './ProductCard';
import './FeaturedSection.css';
import { useProduct } from '../context/ProductContext';

const FeaturedSection = () => {
    const { products: allProducts } = useProduct();

    return (
        <section className="featured-section container">
            <div className="section-header">
                <h2 className="section-title">Trending Now</h2>
                <a href="/shop" className="view-all-link">View All Products</a>
            </div>

            <div className="product-grid">
                {allProducts.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedSection;

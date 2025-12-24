import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <div className="product-card">
            <div className="product-image-container">
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} className="product-image" />
                </Link>
                <button
                    className="add-to-cart-btn"
                    onClick={() => {
                        addToCart(product, 1, 'M'); // Default size M, qty 1
                        alert(`${product.name} added to cart!`);
                    }}
                >
                    <ShoppingBag size={18} /> Add to Cart
                </button>
            </div>
            <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-link">
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                <div className="product-price">
                    <span className="current-price">₹{product.price}</span>
                    {product.originalPrice && (
                        <span className="original-price">₹{product.originalPrice}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

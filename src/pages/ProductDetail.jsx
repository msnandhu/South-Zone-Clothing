import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import './ProductDetail.css';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { products: allProducts } = useProduct();
    const [selectedSize, setSelectedSize] = useState('S');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    // Find product by ID
    const product = allProducts.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Product not found</div>;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const handleQuantityChange = (type) => {
        if (type === 'inc' && quantity < 10) setQuantity(quantity + 1);
        if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedSize);
        alert(`${product.name} (Size: ${selectedSize}) added to cart!`);
    };

    return (
        <div className="product-detail-page container">
            <div className="product-layout">

                {/* Gallery - Left Side */}
                <div className="product-gallery-section">
                    <div className="main-image-wrapper">
                        <img src={product.images[activeImage]} alt={product.name} className="pdp-main-image" />
                    </div>
                    <div className="thumbnail-row">
                        {product.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                className={`pdp-thumb ${activeImage === i ? 'active' : ''}`}
                                onClick={() => setActiveImage(i)}
                                alt=""
                            />
                        ))}
                    </div>
                </div>

                {/* Info - Right Side */}
                <div className="product-info-section">
                    <h1 className="pdp-title serif-title">{product.name}</h1>

                    <div className="pdp-price-block">
                        <span className="pdp-current-price">Rs. {product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <>
                                <span className="pdp-original-price">Rs. {product.originalPrice.toFixed(2)}</span>
                                <span className="pdp-save-badge">SAVE RS. {(product.originalPrice - product.price).toFixed(2)}</span>
                            </>
                        )}
                    </div>

                    <div className="separator-line"></div>

                    {product.stock <= 5 && (
                        <p className="stock-warning">Only {product.stock} unit left</p>
                    )}

                    <div className="pdp-selector-group">
                        <h3 className="selector-title">Size: {selectedSize}</h3>
                        <div className="size-selector-squares">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-square ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pdp-selector-group">
                        <h3 className="selector-title">Quantity:</h3>
                        <div className="quantity-box">
                            <button onClick={() => handleQuantityChange('dec')}><Minus size={14} /></button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange('inc')}><Plus size={14} /></button>
                        </div>
                    </div>

                    <div className="pdp-actions-stack">
                        <button className="btn-full btn-outline-white" onClick={handleAddToCart}>ADD TO CART</button>
                        <button className="btn-full btn-white-fill">BUT IT NOW</button>
                    </div>

                    <div className="pdp-description-text">
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

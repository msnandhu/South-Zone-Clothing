import React from 'react';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    const subtotal = cartItems.reduce((sum, item) => {
        const itemPrice = item.appliedOffer
            ? item.price - (item.price * (item.appliedOffer.discountPercentage / 100))
            : item.price;
        return sum + (itemPrice * item.quantity);
    }, 0);

    const shipping = 100;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/checkout' } } });
        } else {
            navigate('/checkout');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page container empty-cart">
                <ShoppingBag size={64} className="empty-icon" />
                <h2>Your Bag is Empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <Link to="/shop" className="btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h1 className="page-title">Shopping Bag ({cartItems.length})</h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cartItems.map(item => {
                        const hasOffer = !!item.appliedOffer;
                        const discountedPrice = hasOffer
                            ? item.price - (item.price * (item.appliedOffer.discountPercentage / 100))
                            : item.price;

                        return (
                            <div key={`${item.id}-${item.size}`} className="cart-item">
                                <Link to={`/product/${item.id}`} className="item-image-link">
                                    <img
                                        src={item.images ? item.images[0] : (item.image || '/placeholder.jpg')}
                                        alt={item.name}
                                        className="item-image"
                                    />
                                </Link>

                                <div className="item-details">
                                    <div className="item-header">
                                        <div>
                                            <Link to={`/product/${item.id}`} className="item-name">{item.name}</Link>
                                            {hasOffer && (
                                                <span className="cart-offer-badge" style={{
                                                    display: 'inline-block',
                                                    backgroundColor: '#ffebee',
                                                    color: '#d32f2f',
                                                    fontSize: '0.75rem',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    marginLeft: '8px',
                                                    fontWeight: '600'
                                                }}>
                                                    {item.appliedOffer.title} ({item.appliedOffer.discountPercentage}% OFF)
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id, item.size)}
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <p className="item-size">Size: {item.size}</p>
                                    <div className="item-footer">
                                        <div className="qty-control">
                                            <button onClick={() => updateQuantity(item.id, item.size, -1)}><Minus size={14} /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.size, 1)}><Plus size={14} /></button>
                                        </div>
                                        <div className="price-display">
                                            {hasOffer && <span className="original-price-strike" style={{ textDecoration: 'line-through', color: '#999', marginRight: '8px', fontSize: '0.9rem' }}>Rs. {(item.price * item.quantity).toFixed(2)}</span>}
                                            <span className="item-price">Rs. {(discountedPrice * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Rs. {shipping.toFixed(2)}</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>Rs. {total.toFixed(2)}</span>
                    </div>

                    <button onClick={handleCheckout} className="btn-primary checkout-btn">
                        Proceed to Checkout <ArrowRight size={18} />
                    </button>

                    <p className="secure-note">Secure Checkout - SSL Encrypted</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;

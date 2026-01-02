import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const { addOrder } = useOrder();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        city: '',
        zipCode: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBuyNow = async (e) => {
        e.preventDefault();
        // Mock Payment Gateway Logic
        const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        const confirmPayment = window.confirm(
            `Proceeding to Payment Gateway...\n\nTotal Amount: Rs. ${totalAmount}\n\nClick OK to simulate successful payment.`
        );

        if (confirmPayment) {
            // Prepare Product List string
            // const productList = cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ');

            // 3. Save Order to Database (Context)
            addOrder({
                ...formData,
                items: cartItems,
                total: totalAmount
            });

            alert('Payment Successful! Your order has been placed.');
            clearCart();
            navigate('/');
        }
    };

    return (
        <div className="checkout-page container">
            <h1 className="serif-title">CHECKOUT</h1>

            <div className="checkout-container">
                <div className="shipping-form">
                    <h3>Shipping Details</h3>
                    <form onSubmit={handleBuyNow}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows="3"
                                required
                            ></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-black mt-4">BUY NOW</button>
                    </form>
                </div>

                <div className="order-summary-sidebar">
                    <h3>Order Summary</h3>
                    {/* Mock Item for display */}
                    <div className="summary-item">
                        <span>Ice Blue Patch Shirt (x1)</span>
                        <span>Rs. 1250</span>
                    </div>
                    <div className="divider"></div>
                    <div className="summary-total-row">
                        <span>Total To Pay</span>
                        <span>Rs. 1250</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

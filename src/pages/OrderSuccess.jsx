import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
    return (
        <div className="container" style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CheckCircle size={64} color="#4CAF50" style={{ marginBottom: '1.5rem' }} />
            <h1 className="serif-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Thank You!</h1>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
                Your order has been placed successfully. We'll send you an email confirmation shortly.
            </p>
            <Link to="/" className="btn-black">
                Continue Shopping
            </Link>
        </div>
    );
};

export default OrderSuccess;

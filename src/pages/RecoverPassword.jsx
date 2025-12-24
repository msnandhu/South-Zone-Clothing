import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Reusing Login styles for consistency

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending password reset email
        if (email) {
            alert(`Password reset link has been sent to ${email}`);
            navigate('/login');
        } else {
            alert('Please enter your registered email address.');
        }
    };

    return (
        <div className="login-page container">
            <div className="login-form-container">
                <h2 className="serif-title">RECOVER PASSWORD</h2>
                <p className="login-subtitle">Enter your email to reset your password:</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-black">SEND RESET LINK</button>
                </form>

                <div className="login-footer">
                    <p>Remember your password? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;

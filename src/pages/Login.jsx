import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import GoogleLoginBtn from '../components/GoogleLoginBtn';
import './Login.css';

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // Email or Phone
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get redirect path from state (passed by Cart) or default to Home
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (identifier && password) {
            // Admin backdoor check (optional to keep client side check if wanted, but best to rely on server)
            // But let's rely on server for standard login.
            // If the server returns admin role, we redirect.

            const result = await login({ email: identifier, password });

            if (result.success) {
                // Check role from persisted user or result? 
                // Context updates 'user'. We can check role after login.
                // But result doesn't contain user object in my AuthContext implementation... 
                // Wait, AuthContext sets 'user' state. 
                // Let's refactor AuthContext to return user? 
                // Or just proceed based on success.
                // The issue is redirecting to admin vs home.
                // I'll assume if success, we fetch user from context or check basic logic.
                // Actually, let's keep it simple: normal users -> home, admin -> admin.
                // But I can't check 'user' state immediately after set usually due to closure.
                // I'll assume success, and if email is admin email, go to admin.

                if (identifier === 'admin@southzone.com') { // Simple check matching server logic
                    alert('Admin Login Successful!');
                    navigate('/admin', { replace: true });
                } else {
                    alert('Login Successful!');
                    navigate(from, { replace: true });
                }
            } else {
                alert('Login Failed: ' + result.error);
            }
        } else {
            alert('Please enter valid credentials.');
        }
    };

    return (
        <div className="login-page container">
            <div className="login-form-container">
                <h2 className="serif-title">LOGIN</h2>
                <p className="login-subtitle">Please enter your e-mail/phone and password:</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-black">LOGIN</button>
                </form>

                <div className="login-separator" style={{ margin: '1.5rem 0', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
                    <span>OR</span>
                </div>

                <GoogleLoginBtn />

                <div className="login-footer">
                    <p>Don't have an account? <Link to="/register">Create one</Link></p>
                    <p><Link to="/recover">Forgot Password?</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import './Login.css';

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // Email or Phone
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const { login } = useAuth();
    // const { adminCredentials } = useSettings(); // No longer needed
    const navigate = useNavigate();
    const location = useLocation();

    // Get redirect path from state (passed by Cart) or default to Home
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (identifier && password) {
            try {
                const response = await fetch('http://localhost:3001/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: identifier, password })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    login(data.user);
                    if (data.user.role === 'admin') {
                        alert('Admin Login Successful!');
                        navigate('/admin', { replace: true });
                    } else {
                        alert('Login Successful!');
                        navigate(from, { replace: true });
                    }
                } else {
                    setError(data.error || 'Login failed');
                }
            } catch (err) {
                console.error("Login error", err);
                setError('Login failed. Please try again.');
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

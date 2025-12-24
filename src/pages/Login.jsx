import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import './Login.css';

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // Email or Phone
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const { adminCredentials } = useSettings();
    const navigate = useNavigate();
    const location = useLocation();

    // Get redirect path from state (passed by Cart) or default to Home
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        if (identifier && password) {
            let mockUser = {
                id: '123',
                name: 'Test User',
                identifier: identifier,
                role: 'customer'
            };

            // Admin Login Simulation
            if (identifier === adminCredentials.email && password === adminCredentials.password) {
                mockUser = {
                    id: '999',
                    name: 'Admin User',
                    identifier: identifier,
                    role: 'admin'
                };
                login(mockUser);
                alert('Admin Login Successful!');
                navigate('/admin', { replace: true });
            } else {
                login(mockUser);
                alert('Login Successful!');
                navigate(from, { replace: true });
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

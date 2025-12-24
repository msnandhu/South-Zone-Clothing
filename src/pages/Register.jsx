import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register } = useAuth(); // Import register instead of just login
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName && lastName && email && password) {
            const result = await register({
                name: `${firstName} ${lastName}`,
                email,
                password,
                phone: '' // Add phone input if needed, using empty for now or add field
            });

            if (result.success) {
                alert('Account Created Successfully!');
                navigate('/');
            } else {
                alert('Registration Failed: ' + result.error);
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div className="register-page container">
            <div className="register-form-container">
                <h2 className="serif-title">CREATE ACCOUNT</h2>
                <p className="register-subtitle">Please enter your details:</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="btn-black">CREATE</button>
                </form>

                <div className="register-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;

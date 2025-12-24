import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleLoginBtn = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        // Simulate network delay
        const btn = document.getElementById('google-login-btn');
        if (btn) btn.style.opacity = '0.7';

        setTimeout(() => {
            const mockGoogleUser = {
                id: 'g_' + Date.now(),
                name: 'Google User',
                email: 'user@gmail.com',
                role: 'customer',
                photoURL: 'https://lh3.googleusercontent.com/a/default-user=s96-c', // Generic Google-like avatar
                provider: 'google'
            };

            login(mockGoogleUser);
            alert('Successfully signed in with Google!');
            navigate(from, { replace: true });
        }, 1000);
    };

    return (
        <button
            id="google-login-btn"
            type="button"
            onClick={handleGoogleLogin}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                color: '#757575',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Roboto, sans-serif', // Authentic Google font
                cursor: 'pointer',
                width: '100%',
                marginTop: '1rem',
                transition: 'background-color 0.2s, box-shadow 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google G"
                style={{ width: '18px', height: '18px', marginRight: '12px' }}
            />
            Sign in with Google
        </button>
    );
};

export default GoogleLoginBtn;

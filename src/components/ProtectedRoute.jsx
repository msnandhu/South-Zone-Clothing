import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    // Check if user exists and is not an empty object (basic check)
    // Also check for specific role if required
    if (!isAuthenticated || !user || Object.keys(user).length === 0) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />; // Unauthorized, go home
    }

    return children;
};

export default ProtectedRoute;

import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Admin.css';
import { LayoutDashboard, Package, LogOut, Tag, Image, Layers, Settings, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">SOUTH ZONE<br /><span className="admin-badge">ADMIN</span></div>

                <nav className="admin-nav">
                    <Link to="/admin" className={`admin-nav-item ${isActive('/admin') ? 'active' : ''}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/products" className={`sidebar-link ${location.pathname.includes('/products') ? 'active' : ''}`}>
                        <Package size={20} /> Products
                    </Link>
                    <Link to="/admin/offers" className={`sidebar-link ${location.pathname.includes('/offers') ? 'active' : ''}`}>
                        <Tag size={20} /> Offers
                    </Link>
                    <Link to="/admin/hero-slider" className={`sidebar-link ${location.pathname.includes('/hero-slider') ? 'active' : ''}`}>
                        <Image size={20} /> Hero Slider
                    </Link>
                    <Link to="/admin/collections" className={`sidebar-link ${location.pathname.includes('/collections') ? 'active' : ''}`}>
                        <Layers size={20} /> Collections
                    </Link>
                    <Link to="/admin/sales" className={`sidebar-link ${location.pathname.includes('/sales') ? 'active' : ''}`}>
                        <TrendingUp size={20} /> Sales & Orders
                    </Link>
                    <Link to="/admin/settings" className={`sidebar-link ${location.pathname.includes('/settings') ? 'active' : ''}`}>
                        <Settings size={20} /> Settings
                    </Link>
                </nav>

                <button onClick={logout} className="admin-logout">
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

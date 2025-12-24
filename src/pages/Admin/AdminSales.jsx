import React, { useState } from 'react';
import { useOrder } from '../../context/OrderContext';
import { Search, TrendingUp, ShoppingBag, DollarSign } from 'lucide-react';
import './Admin.css';

const AdminSales = () => {
    const { orders, getOrderStats } = useOrder();
    const [searchTerm, setSearchTerm] = useState('');
    const { totalOrders, totalRevenue, avgOrderValue } = getOrderStats();

    const filteredOrders = orders.filter(order =>
        order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phoneNumber.includes(searchTerm) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Sales & Orders</h1>
                    <p className="admin-subtitle">Track customer orders and revenue</p>
                </div>
            </div>

            {/* Analytics Cards */}
            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-title">Total Revenue</span>
                        <span className="stat-value">Rs. {totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="stat-icon-wrapper" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                        <DollarSign size={24} />
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-title">Total Orders</span>
                        <span className="stat-value">{totalOrders}</span>
                    </div>
                    <div className="stat-icon-wrapper" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
                        <ShoppingBag size={24} />
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-title">Avg. Order Value</span>
                        <span className="stat-value">Rs. {avgOrderValue}</span>
                    </div>
                    <div className="stat-icon-wrapper" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                        <TrendingUp size={24} />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="admin-card">
                <div className="page-header" style={{ marginBottom: '1rem' }}>
                    <h3>Recent Orders</h3>
                    <div className="search-box" style={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                        <Search size={18} color="#888" />
                        <input
                            type="text"
                            placeholder="Search Customer or Order ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ border: 'none', background: 'transparent', marginLeft: '0.5rem', outline: 'none', fontSize: '0.9rem' }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer Info</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map(order => (
                                    <tr key={order.id}>
                                        <td style={{ fontSize: '0.8rem', color: '#666' }}>{order.id}</td>
                                        <td style={{ fontSize: '0.9rem' }}>{new Date(order.date).toLocaleDateString()}</td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: '500' }}>{order.fullName}</span>
                                                <span style={{ fontSize: '0.8rem', color: '#666' }}>{order.phoneNumber}</span>
                                                <span style={{ fontSize: '0.8rem', color: '#888' }}>{order.city}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                                                {order.items.map((item, idx) => (
                                                    <li key={idx} style={{ marginBottom: '4px' }}>
                                                        {item.quantity}x {item.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td style={{ fontWeight: '600' }}>Rs. {order.total}</td>
                                        <td>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                fontSize: '0.75rem',
                                                backgroundColor: '#e8f5e9',
                                                color: '#2e7d32',
                                                fontWeight: '500'
                                            }}>
                                                Success
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminSales;

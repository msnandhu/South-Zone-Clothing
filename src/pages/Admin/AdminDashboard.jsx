import React from 'react';
import { useProduct } from '../../context/ProductContext';
import { Package, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
    const { products } = useProduct();

    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => Number(p.stock) < 5).length;

    // Calculate total inventory value
    const totalValue = products.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.stock)), 0);

    return (
        <div>
            <h1 className="admin-title">Dashboard</h1>

            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-title">Total Products</span>
                        <span className="stat-value">{totalProducts}</span>
                    </div>
                    <div className="stat-icon-wrapper" style={{ backgroundColor: '#f0f0f0' }}>
                        <Package size={24} color="#333" />
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-title">Total Inventory Value</span>
                        <span className="stat-value">₹{totalValue.toLocaleString()}</span>
                    </div>
                    <div className="stat-icon-wrapper" style={{ backgroundColor: '#e8f5e9' }}>
                        <TrendingUp size={24} color="#28a745" />
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-title">Low Stock Items</span>
                        <span className="stat-value">{lowStockProducts}</span>
                    </div>
                    <div className="stat-icon-wrapper" style={{ backgroundColor: '#ffebee' }}>
                        <AlertTriangle size={24} color="#dc3545" />
                    </div>
                </div>
            </div>

            <h3>Recent Products</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.slice(-5).reverse().map(product => (
                        <tr key={product.id}>
                            <td>#{product.id}</td>
                            <td>{product.name}</td>
                            <td>₹{product.price}</td>
                            <td>
                                <span style={{ color: Number(product.stock) < 5 ? 'red' : 'green' }}>
                                    {product.stock}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;

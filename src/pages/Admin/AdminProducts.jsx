import React from 'react';
import { useProduct } from '../../context/ProductContext';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminProducts = () => {
    const { products, deleteProduct } = useProduct();

    const handleDelete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="admin-title">All Products</h1>
                <Link to="/admin/products/new" className="btn-add">
                    <Plus size={18} /> Add New Product
                </Link>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img src={product.image} alt={product.name} className="product-thumb" />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>₹{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Link to={`/admin/products/edit/${product.id}`}>
                                    <button className="action-btn btn-edit"><Edit size={16} /></button>
                                </Link>
                                <button
                                    className="action-btn btn-delete"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;

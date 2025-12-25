import React from 'react';
import { useProduct } from '../../context/ProductContext';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminProducts = () => {
    const { products, deleteProduct } = useProduct();

    const [deleteId, setDeleteId] = React.useState(null);

    const confirmDelete = (id) => {
        setDeleteId(id);
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteProduct(deleteId);
            setDeleteId(null);
        }
    };

    return (
        <div>
            {deleteId && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white', padding: '2rem',
                        borderRadius: '8px', maxWidth: '400px', width: '90%',
                        textAlign: 'center'
                    }}>
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this product? This action cannot be undone.</p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '1.5rem' }}>
                            <button
                                onClick={handleDelete}
                                className="admin-btn btn-danger"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setDeleteId(null)}
                                className="admin-btn"
                                style={{ backgroundColor: '#ccc', color: '#000' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                    type="button"
                                    className="action-btn btn-delete"
                                    onClick={() => confirmDelete(product.id)}
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

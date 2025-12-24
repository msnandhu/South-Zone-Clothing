import React, { useState } from 'react';
import { useOffer } from '../../context/OfferContext';
import { Trash2, Plus } from 'lucide-react';
import './Admin.css';

const AdminOffers = () => {
    const { offers, addOffer, deleteOffer } = useOffer();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        discountPercentage: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result }); // Store base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.discountPercentage || !formData.image) {
            alert('Please fill all required fields and upload an image.');
            return;
        }

        addOffer({
            ...formData,
            discountPercentage: Number(formData.discountPercentage)
        });

        // Reset form
        setFormData({ title: '', discountPercentage: '', description: '', image: '' });
        setShowForm(false);
        // Reset file input if possible (by ID)
        const fileInput = document.getElementById('offer-image-upload');
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Offers & Banners</h1>
                    <p className="admin-subtitle">Manage store-wide offers and promotional banners</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-black">
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    {showForm ? 'Cancel' : 'Add New Offer'}
                </button>
            </div>

            {showForm && (
                <div className="admin-card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Create New Offer</h3>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label>Offer Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Summer Sale"
                                    className="form-input"
                                />
                            </div>
                            <div style={{ width: '150px' }}>
                                <label>Discount %</label>
                                <input
                                    name="discountPercentage"
                                    type="number"
                                    value={formData.discountPercentage}
                                    onChange={handleChange}
                                    required
                                    placeholder="20"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label>Description</label>
                            <input
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Short description for the banner"
                                className="form-input"
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label>Offer Image</label>
                            <input
                                id="offer-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="form-input"
                                style={{ padding: '10px' }}
                                required={!formData.image} // Required only if no image set yet
                            />
                            {formData.image && (
                                <div style={{ marginTop: '10px' }}>
                                    <p style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Preview:</p>
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        style={{ height: '100px', borderRadius: '4px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn-black">Create Offer</button>
                    </form>
                </div>
            )}

            <div className="offers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {offers.map(offer => (
                    <div key={offer.id} className="offer-card" style={{
                        border: '1px solid #eee',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{ height: '150px', overflow: 'hidden' }}>
                            <img src={offer.image} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{offer.title}</h3>
                                <span style={{
                                    background: '#000',
                                    color: '#fff',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem'
                                }}>
                                    {offer.discountPercentage}% OFF
                                </span>
                            </div>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>{offer.description}</p>
                            <button
                                onClick={() => deleteOffer(offer.id)}
                                style={{
                                    marginTop: '1rem',
                                    border: 'none',
                                    background: '#ffefef',
                                    color: '#d32f2f',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontSize: '0.8rem'
                                }}
                            >
                                <Trash2 size={14} /> Delete Offer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOffers;

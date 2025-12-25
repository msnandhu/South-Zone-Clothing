import React, { useState } from 'react';
import { useCollection } from '../../context/CollectionContext';
import { Trash2, Plus, Save } from 'lucide-react';
import './Admin.css';

const AdminCollections = () => {
    const { collections, addCollection, deleteCollection, saveCollections } = useCollection();
    const [showForm, setShowForm] = useState(false);
    const [newCollection, setNewCollection] = useState({
        title: '',
        image: '',
        link: '',
        textPosition: 'middle',
        textColor: '#ffffff'
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCollection({ ...newCollection, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCollection.title || !newCollection.image) {
            alert('Title and Image are required.');
            return;
        }

        const link = newCollection.link || `/shop?category=${newCollection.title.toLowerCase().replace(/\s+/g, '-')}`;

        addCollection({
            ...newCollection,
            link
        });

        setNewCollection({ title: '', image: '', link: '', textPosition: 'middle', textColor: '#ffffff' });
        setShowForm(false);
        // Reset file input
        const fileInput = document.getElementById('collection-image-upload');
        if (fileInput) fileInput.value = '';
    };

    return (

        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Collections Management</h1>
                    <p className="admin-subtitle">Manage "Our Collection" section on homepage</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={() => saveCollections(collections)}
                        className="btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                        <Save size={18} /> Save Preset
                    </button>
                    <button type="button" onClick={() => setShowForm(!showForm)} className="btn-black">
                        <Plus size={18} style={{ marginRight: '8px' }} />
                        {showForm ? 'Cancel' : 'Add New Collection'}
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="admin-card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Add New Collection</h3>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Title</label>
                            <input
                                value={newCollection.title}
                                onChange={(e) => setNewCollection({ ...newCollection, title: e.target.value })}
                                required
                                placeholder="e.g., WINTER JACKETS"
                                className="form-input"
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label>Text Position</label>
                            <select
                                value={newCollection.textPosition}
                                onChange={(e) => setNewCollection({ ...newCollection, textPosition: e.target.value })}
                                className="form-input"
                                style={{ marginTop: '0.5rem' }}
                            >
                                <option value="middle">Middle (Default)</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label>Text Color</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0.5rem' }}>
                                <input
                                    type="color"
                                    value={newCollection.textColor}
                                    onChange={(e) => setNewCollection({ ...newCollection, textColor: e.target.value })}
                                    style={{ height: '40px', width: '60px', padding: '0', border: 'none', cursor: 'pointer' }}
                                />
                                <span style={{ fontSize: '0.9rem', color: '#666' }}>{newCollection.textColor}</span>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label>Collection Image</label>
                            <input
                                id="collection-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="form-input"
                                style={{ padding: '10px' }}
                                required={!newCollection.image}
                            />
                            {newCollection.image && (
                                <div style={{ marginTop: '10px' }}>
                                    <p style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Preview:</p>
                                    <img
                                        src={newCollection.image}
                                        alt="Preview"
                                        style={{ height: '100px', borderRadius: '4px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn-black">Add Collection</button>
                    </form>
                </div>
            )}

            <div className="admin-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                {collections.map(item => (
                    <div key={item.id} className="offer-card" style={{
                        border: '1px solid #eee',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{item.title}</h3>
                            <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '1rem' }}>Link: {item.link}</p>
                            <button
                                onClick={() => deleteCollection(item.id)}
                                style={{
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
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCollections;

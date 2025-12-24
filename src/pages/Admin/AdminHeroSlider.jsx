import React, { useState } from 'react';
import { useHero } from '../../context/HeroContext';
import { Trash2, Plus, Edit2, Save, X } from 'lucide-react';

const AdminHeroSlider = () => {
    const { slides, addSlide, updateCaption, removeSlide } = useHero();
    const [newImageUrl, setNewImageUrl] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editCaption, setEditCaption] = useState('');
    const [isAddMode, setIsAddMode] = useState(false); // To toggle Caption Add mode if desired, or simpler inline

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddImage = (e) => {
        e.preventDefault();
        if (newImageUrl) {
            addSlide(newImageUrl);
            setNewImageUrl('');
            // Reset file input
            document.getElementById('hero-image-upload').value = '';
        }
    };

    const startEditing = (slide) => {
        setEditingId(slide.id);
        setEditCaption(slide.caption);
    };

    const saveCaption = (id) => {
        updateCaption(id, editCaption);
        setEditingId(null);
    };

    return (
        <div className="admin-page">
            <h1 className="admin-title">Hero Slider Management</h1>

            <div className="admin-section">
                <h3>Add New Image</h3>
                <form onSubmit={handleAddImage} className="add-offer-form" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                        id="hero-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="form-input"
                        style={{ flex: 1, padding: '10px' }}
                    />
                    <button type="submit" className="admin-btn btn-primary" disabled={!newImageUrl}>
                        <Plus size={18} /> Add Slide
                    </button>
                </form>
                {newImageUrl && (
                    <div style={{ marginTop: '1rem', width: '200px' }}>
                        <p>Preview:</p>
                        <img src={newImageUrl} alt="Preview" style={{ width: '100%', borderRadius: '8px' }} />
                    </div>
                )}
            </div>

            <div className="admin-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', marginTop: '2rem' }}>
                {slides.map(slide => (
                    <div key={slide.id} className="product-card" style={{ padding: '1rem' }}>
                        <div style={{ position: 'relative', height: '150px', marginBottom: '1rem', overflow: 'hidden', borderRadius: '8px' }}>
                            <img
                                src={slide.image}
                                alt="Slide"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        <div className="slide-details">
                            {editingId === slide.id ? (
                                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        value={editCaption}
                                        onChange={(e) => setEditCaption(e.target.value)}
                                        className="form-input"
                                        autoFocus
                                    />
                                    <button onClick={() => saveCaption(slide.id)} className="icon-btn success" title="Save">
                                        <Save size={18} />
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="icon-btn" title="Cancel">
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <p style={{ fontWeight: 'bold' }}>{slide.caption}</p>
                                    <button onClick={() => startEditing(slide)} className="icon-btn" title="Edit Caption">
                                        <Edit2 size={18} />
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={() => removeSlide(slide.id)}
                                className="admin-btn btn-danger"
                                style={{ width: '100%', marginTop: 'auto' }}
                            >
                                <Trash2 size={18} /> Remove Slide
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHeroSlider;

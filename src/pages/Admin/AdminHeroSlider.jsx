import React, { useState } from 'react';
import { useHero } from '../../context/HeroContext';
import { Trash2, Plus, Edit2, Save, X } from 'lucide-react';

const AdminHeroSlider = () => {
    const { slides, saveHeroSlides } = useHero();
    const [localSlides, setLocalSlides] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editCaption, setEditCaption] = useState('');
    const [hasChanges, setHasChanges] = useState(false);

    // Initialize local state from context
    React.useEffect(() => {
        setLocalSlides(slides);
    }, [slides]);

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
            const newSlide = {
                id: Date.now(),
                image: newImageUrl,
                caption: 'NEW ARRIVAL'
            };
            setLocalSlides([...localSlides, newSlide]);
            setHasChanges(true);
            setNewImageUrl('');
            document.getElementById('hero-image-upload').value = '';
        }
    };

    const startEditing = (slide) => {
        setEditingId(slide.id);
        setEditCaption(slide.caption);
    };

    const saveCaption = (id) => {
        setLocalSlides(localSlides.map(slide =>
            slide.id === id ? { ...slide, caption: editCaption } : slide
        ));
        setEditingId(null);
        setHasChanges(true);
    };

    const removeSlide = (id) => {
        setLocalSlides(localSlides.filter(slide => slide.id !== id));
        setHasChanges(true);
    };

    const handleSavePreset = () => {
        saveHeroSlides(localSlides);
        setHasChanges(false);
    };

    const handleDiscard = () => {
        setLocalSlides(slides);
        setHasChanges(false);
    };

    return (
        <div className="admin-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="admin-title" style={{ marginBottom: 0 }}>Hero Slider Management</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {hasChanges && (
                        <button onClick={handleDiscard} className="admin-btn btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <X size={18} /> Discard Changes
                        </button>
                    )}
                    <button onClick={handleSavePreset} className="admin-btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} disabled={!hasChanges}>
                        <Save size={18} /> Save Preset
                    </button>
                </div>
            </div>

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
                        <Plus size={18} /> Add to List
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
                {localSlides.map(slide => (
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
                                    <button onClick={() => saveCaption(slide.id)} className="icon-btn success" title="Update Local">
                                        <div style={{ transform: 'scale(0.8)' }}>Save</div>
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
                                <Trash2 size={18} /> Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHeroSlider;

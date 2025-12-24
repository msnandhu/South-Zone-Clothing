import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { ArrowLeft } from 'lucide-react';

const ProductForm = () => {
    const { id } = useParams(); // If ID exists, we are in Edit mode
    const navigate = useNavigate();
    const { products, addProduct, updateProduct, categories, addCategory } = useProduct();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        id: '', // New ID field
        name: '',
        price: '',
        originalPrice: '',
        category: 'shirts',
        description: '',
        image: '', // Main image URL placeholder
        stock: 0,
        discountPercentage: '', // Added for offer logic
        sizes: [] // Checkbox selection
    });

    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    // Load data if edit mode
    useEffect(() => {
        if (isEditMode) {
            const product = products.find(p => p.id === parseInt(id));
            if (product) {
                setFormData({
                    ...product,
                    sizes: product.sizes || []
                });
            }
        }
    }, [id, products, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Auto-calculate price if discount percentage changes
        if (name === 'discountPercentage') {
            const discount = Number(value);
            const original = Number(formData.originalPrice);
            if (original && discount >= 0 && discount <= 100) {
                const discountedPrice = Math.round(original - (original * discount / 100));
                setFormData(prev => ({
                    ...prev,
                    [name]: value,
                    price: discountedPrice
                }));
            } else {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        }
        // Recalculate if original price changes while discount exists
        else if (name === 'originalPrice') {
            const original = Number(value);
            const discount = Number(formData.discountPercentage);
            if (discount > 0) {
                const discountedPrice = Math.round(original - (original * discount / 100));
                setFormData(prev => ({
                    ...prev,
                    [name]: value,
                    price: discountedPrice
                }));
            } else {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSizeChange = (size) => {
        setFormData(prev => {
            const sizes = prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size];
            return { ...prev, sizes };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate unique ID if manually entered in Add Mode
        if (!isEditMode && formData.id) {
            const idExists = products.some(p => p.id === Number(formData.id));
            if (idExists) {
                alert(`Error: Product ID ${formData.id} already exists. Please use a unique ID.`);
                return;
            }
        }

        const productData = {
            ...formData,
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            stock: Number(formData.stock),
            // Ensure images array exists, fallback to main image
            images: formData.images || [formData.image]
        };

        if (isEditMode) {
            updateProduct(parseInt(id), productData);
            alert('Product updated successfully!');
        } else {
            addProduct(productData);
            alert('Product added successfully!');
        }
        navigate('/admin/products');
    };

    const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36'];

    return (
        <div className="product-form-page">
            <button onClick={() => navigate('/admin/products')} className="btn-back" style={{ marginBottom: '1rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', gap: '5px' }}>
                <ArrowLeft size={20} /> Back to Products
            </button>
            <h1 className="admin-title">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>

            <form onSubmit={handleSubmit} className="admin-form" style={{ maxWidth: '600px', background: 'white', padding: '2rem', borderRadius: '10px' }}>
                {!isEditMode && (
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '.5rem' }}>Product ID (Optional)</label>
                        <input
                            name="id"
                            type="number"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="Auto-generated if left blank"
                            className="form-input"
                            style={{ border: '1px solid #ddd' }}
                        />
                    </div>
                )}

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '.5rem' }}>Product Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className="form-input" style={{ border: '1px solid #ddd' }} />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '.5rem' }}>Original Price</label>
                        <input name="originalPrice" type="number" value={formData.originalPrice} onChange={handleChange} required className="form-input" style={{ border: '1px solid #ddd' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '.5rem' }}>Discount %</label>
                        <input name="discountPercentage" type="number" value={formData.discountPercentage} onChange={handleChange} placeholder="0" className="form-input" style={{ border: '1px solid #ddd' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '.5rem' }}>Final Price (Calculated)</label>
                        <input name="price" type="number" value={formData.price} readOnly className="form-input" style={{ border: '1px solid #ddd', background: '#f5f5f5' }} />
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '.5rem' }}>Category</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="form-input"
                            style={{ border: '1px solid #ddd', flex: 1 }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>

                        {isAddingCategory ? (
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    placeholder="New Category"
                                    className="form-input"
                                    style={{ border: '1px solid #ddd', width: '150px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (newCategory.trim()) {
                                            const formattedCat = newCategory.trim().toLowerCase();
                                            addCategory(formattedCat);
                                            setFormData(prev => ({ ...prev, category: formattedCat }));
                                            setIsAddingCategory(false);
                                            setNewCategory('');
                                        }
                                    }}
                                    className="btn-black"
                                    style={{ padding: '0 10px' }}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAddingCategory(false);
                                        setNewCategory('');
                                    }}
                                    style={{ background: '#ccc', border: 'none', borderRadius: '4px', padding: '0 10px', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsAddingCategory(true)}
                                className="btn-black"
                                style={{ padding: '0 15px', whiteSpace: 'nowrap' }}
                            >
                                + Add New
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '.5rem' }}>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="form-input" style={{ border: '1px solid #ddd' }} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '.5rem' }}>Product Image</label>

                    {formData.image ? (
                        <div style={{ position: 'relative', width: 'fit-content' }}>
                            <img
                                src={formData.image}
                                alt="Preview"
                                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    background: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData(prev => ({ ...prev, image: reader.result }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="form-input"
                            style={{ border: '1px solid #ddd', padding: '10px' }}
                        />
                    )}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '.5rem' }}>Available Sizes</label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {availableSizes.map(size => (
                            <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.sizes.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                />
                                {size}
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '.5rem' }}>Stock Quantity</label>
                    <input name="stock" type="number" value={formData.stock} onChange={handleChange} required className="form-input" style={{ border: '1px solid #ddd' }} />
                </div>

                <button type="submit" className="btn-black" style={{ width: '100%' }}>
                    {isEditMode ? 'Update Product' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;

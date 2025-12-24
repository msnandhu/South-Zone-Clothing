import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Save, Trash2, Plus, Shield, MessageSquare, Phone } from 'lucide-react';
import './Admin.css';

const AdminSettings = () => {
    const {
        adminCredentials, updateAdminCredentials,
        siteContent, updateSiteContent,
        faqs, addFaq, deleteFaq
    } = useSettings();

    const [activeTab, setActiveTab] = useState('security');

    // Security State
    const [creds, setCreds] = useState(adminCredentials);

    // Content State
    const [content, setContent] = useState(siteContent);

    // FAQ State
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

    const handleCredentialsSave = (e) => {
        e.preventDefault();
        updateAdminCredentials(creds);
        alert('Credentials updated successfully!');
    };

    const handleContentSave = (e) => {
        e.preventDefault();
        updateSiteContent(content);
        alert('Site content updated successfully!');
    };

    const handleAddFaq = (e) => {
        e.preventDefault();
        if (newFaq.question && newFaq.answer) {
            addFaq(newFaq);
            setNewFaq({ question: '', answer: '' });
        }
    };

    return (
        <div className="admin-page">
            <h1 className="admin-title">Settings</h1>

            <div className="admin-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #eee' }}>
                <button
                    className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveTab('security')}
                    style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', borderBottom: activeTab === 'security' ? '2px solid black' : 'none', fontWeight: activeTab === 'security' ? 'bold' : 'normal', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Shield size={16} /> Account Security
                </button>
                <button
                    className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                    onClick={() => setActiveTab('content')}
                    style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', borderBottom: activeTab === 'content' ? '2px solid black' : 'none', fontWeight: activeTab === 'content' ? 'bold' : 'normal', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Phone size={16} /> Contact Info
                </button>
                <button
                    className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                    onClick={() => setActiveTab('faq')}
                    style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', borderBottom: activeTab === 'faq' ? '2px solid black' : 'none', fontWeight: activeTab === 'faq' ? 'bold' : 'normal', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <MessageSquare size={16} /> FAQ Management
                </button>
            </div>

            <div className="admin-content-area">
                {activeTab === 'security' && (
                    <div className="admin-card" style={{ maxWidth: '600px' }}>
                        <h3>Update Admin Credentials</h3>
                        <form onSubmit={handleCredentialsSave} className="admin-form">
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Admin Email</label>
                                <input
                                    type="email"
                                    value={creds.email}
                                    onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>New Password</label>
                                <input
                                    type="text"
                                    value={creds.password}
                                    onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <button className="btn-black"><Save size={16} /> Update Credentials</button>
                        </form>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="admin-card" style={{ maxWidth: '600px' }}>
                        <h3>Update Contact Information</h3>
                        <form onSubmit={handleContentSave} className="admin-form">
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Support Email</label>
                                <input
                                    value={content.email}
                                    onChange={(e) => setContent({ ...content, email: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Support Phone</label>
                                <input
                                    value={content.phone}
                                    onChange={(e) => setContent({ ...content, phone: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Operating Hours</label>
                                <input
                                    value={content.hours}
                                    onChange={(e) => setContent({ ...content, hours: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Address</label>
                                <textarea
                                    value={content.address}
                                    onChange={(e) => setContent({ ...content, address: e.target.value })}
                                    className="form-input"
                                    rows="3"
                                />
                            </div>
                            <button className="btn-black"><Save size={16} /> Update Info</button>
                        </form>
                    </div>
                )}

                {activeTab === 'faq' && (
                    <div style={{ maxWidth: '800px' }}>
                        <div className="admin-card" style={{ marginBottom: '2rem' }}>
                            <h3>Add New FAQ</h3>
                            <form onSubmit={handleAddFaq} className="admin-form">
                                <input
                                    placeholder="Question"
                                    value={newFaq.question}
                                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                                    className="form-input"
                                    style={{ marginBottom: '1rem' }}
                                />
                                <textarea
                                    placeholder="Answer"
                                    value={newFaq.answer}
                                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                                    className="form-input"
                                    rows="3"
                                    style={{ marginBottom: '1rem' }}
                                />
                                <button className="btn-black"><Plus size={16} /> Add FAQ</button>
                            </form>
                        </div>

                        <div className="faq-list">
                            {faqs.map(faq => (
                                <div key={faq.id} className="admin-card" style={{ marginBottom: '1rem', position: 'relative' }}>
                                    <button
                                        onClick={() => deleteFaq(faq.id)}
                                        style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <h4 style={{ paddingRight: '20px' }}>{faq.question}</h4>
                                    <p style={{ color: '#666', marginTop: '0.5rem' }}>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSettings;

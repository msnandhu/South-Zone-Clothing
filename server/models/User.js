const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // Can use MongoDB _id, but keeping for compatibility
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // In production, this should be hashed!
    phone: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

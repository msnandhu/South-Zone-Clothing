const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
    fullName: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    items: [{
        id: Number,
        name: String,
        price: Number,
        quantity: Number,
        size: String,
        image: String
    }],
    total: { type: Number, required: true },
    paymentMethod: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

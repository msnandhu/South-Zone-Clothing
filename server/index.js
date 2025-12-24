require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const fs = require('fs');
const path = require('path');

const connectDB = require('./config/db');
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Connect to MongoDB
connectDB();

// Seeder Function
const seedData = async () => {
    try {
        const productCount = await Product.countDocuments();
        if (productCount === 0) {

        }
    } catch (err) {
        console.error('Seeding Error:', err);
    }
};
seedData();

// --- Product Routes ---

// GET All Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Create Product
app.post('/api/products', async (req, res) => {
    try {
        // Simple ID generation for now using timestamp, normally Mongo _id is sufficient
        // but frontend expects 'id'.
        const newProduct = new Product({
            ...req.body,
            id: Date.now()
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT Update Product
app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE Product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
        if (deletedProduct) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- Order Routes ---

// GET All Orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Create Order
app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order({
            ...req.body,
            id: 'ORD-' + Date.now(), // Generate ID
            status: 'Pending'
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// --- Auth Routes ---

// POST Register
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({
            id: Date.now().toString(),
            name,
            email,
            password, // NOTE: Hash this in production!
            phone,
            role: 'user'
        });

        await newUser.save();

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Admin backdoor
    if (email === 'admin@southzone.com' && password === 'admin123') {
        return res.json({
            id: 'admin',
            name: 'Admin',
            email: 'admin@southzone.com',
            role: 'admin'
        });
    }

    try {
        const user = await User.findOne({ email, password }); // NOTE: Compare hashed password!
        if (user) {
            const { password: _, ...userWithoutPassword } = user.toObject();
            res.json(userWithoutPassword);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- Twilio SMS ---
let client;
try {
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
        client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    } else {
        console.warn('Twilio credentials missing or invalid. SMS service will be mocked.');
    }
} catch (err) {
    console.warn('Failed to initialize Twilio client:', err.message);
}

app.post('/send-sms', async (req, res) => {
    const { to, message } = req.body;

    if (!to || !message) {
        return res.status(400).json({ success: false, error: 'Missing "to" or "message" field' });
    }

    try {
        console.log(`Sending SMS to ${to}...`);
        if (client) {
            const result = await client.messages.create({
                body: message,
                messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
                to: to
            });
            console.log('SMS Sent! SID:', result.sid);
            res.json({ success: true, sid: result.sid });
        } else {
            console.log('[MOCK SMS] Message logged to console (Twilio not configured).');
            res.json({ success: true, sid: 'MOCK_SID_' + Date.now() });
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

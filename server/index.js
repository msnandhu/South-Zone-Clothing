require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images

// Database Helper
const DB_FILE = path.join(__dirname, 'db.json');

const readDB = () => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            const initialData = { products: [], orders: [], users: [] };
            fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
            return initialData;
        }
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (err) {
        console.error('Error reading DB:', err);
        return { products: [], orders: [], users: [] };
    }
};

const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing DB:', err);
    }
};

// --- Generic Helpers ---
const getCollection = (db, collectionName) => db[collectionName] || [];
const saveCollection = (db, collectionName, data) => {
    db[collectionName] = data;
    writeDB(db);
};

// --- Product Routes ---
app.get('/api/products', (req, res) => {
    const db = readDB();
    res.json(db.products || []);
});

app.post('/api/products', (req, res) => {
    const db = readDB();
    const newProduct = { ...req.body, id: Date.now() };
    db.products = [...(db.products || []), newProduct];
    writeDB(db);
    res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
    const db = readDB();
    const id = Number(req.params.id);
    const index = (db.products || []).findIndex(p => p.id === id);
    if (index !== -1) {
        db.products[index] = { ...db.products[index], ...req.body };
        writeDB(db);
        res.json(db.products[index]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.delete('/api/products/:id', (req, res) => {
    const db = readDB();
    const id = Number(req.params.id);
    const initialLength = (db.products || []).length;
    db.products = (db.products || []).filter(p => p.id !== id);
    if (db.products.length !== initialLength) {
        writeDB(db);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// --- Category Routes ---
app.get('/api/categories', (req, res) => {
    const db = readDB();
    res.json(db.categories || ['shirts', 'pants', 't-shirts']); // Default if empty
});

app.post('/api/categories', (req, res) => {
    const db = readDB();
    const { category } = req.body;
    if (!category) return res.status(400).json({ error: 'Category name required' });

    const categories = db.categories || ['shirts', 'pants', 't-shirts'];
    if (!categories.includes(category)) {
        db.categories = [...categories, category];
        writeDB(db);
    }
    res.json(db.categories);
});

// --- Order Routes ---
app.get('/api/orders', (req, res) => {
    const db = readDB();
    res.json(db.orders || []);
});

app.post('/api/orders', (req, res) => {
    const db = readDB();
    const newOrder = {
        ...req.body,
        id: 'ORD-' + Date.now(),
        date: new Date().toISOString(),
        status: 'Pending'
    };
    db.orders = [newOrder, ...(db.orders || [])];
    writeDB(db);
    res.status(201).json(newOrder);
});

// --- Offer Routes ---
app.get('/api/offers', (req, res) => {
    const db = readDB();
    res.json(db.offers || []);
});

app.post('/api/offers', (req, res) => {
    const db = readDB();
    const newOffer = { ...req.body, id: Date.now() };
    db.offers = [...(db.offers || []), newOffer];
    writeDB(db);
    res.status(201).json(newOffer);
});

app.delete('/api/offers/:id', (req, res) => {
    const db = readDB();
    const id = Number(req.params.id);
    db.offers = (db.offers || []).filter(o => o.id !== id);
    writeDB(db);
    res.json({ success: true });
});

// --- Collection Routes ---
app.get('/api/collections', (req, res) => {
    const db = readDB();
    res.json(db.collections || []); // Should handle initial seed on frontend or here
});

app.post('/api/collections', (req, res) => {
    const db = readDB();
    const newCollection = { ...req.body, id: Date.now() };
    db.collections = [...(db.collections || []), newCollection];
    writeDB(db);
    res.status(201).json(newCollection);
});

app.delete('/api/collections/:id', (req, res) => {
    const db = readDB();
    const id = Number(req.params.id);
    db.collections = (db.collections || []).filter(c => c.id !== id);
    writeDB(db);
    res.json({ success: true });
});

app.put('/api/collections', (req, res) => {
    const db = readDB();
    const collections = req.body;
    if (!Array.isArray(collections)) {
        return res.status(400).json({ error: 'Input must be an array of collections' });
    }
    db.collections = collections;
    writeDB(db);
    res.json({ success: true, collections: db.collections });
});

// --- Settings Routes (Admin Creds, Site Content, FAQs) ---
app.get('/api/settings', (req, res) => {
    const db = readDB();
    res.json({
        adminCredentials: db.adminCredentials || null,
        siteContent: db.siteContent || null,
        faqs: db.faqs || []
    });
});

app.post('/api/settings', (req, res) => {
    const db = readDB();
    const { adminCredentials, siteContent, faqs } = req.body;

    if (adminCredentials) db.adminCredentials = adminCredentials;
    if (siteContent) db.siteContent = siteContent;
    if (faqs) db.faqs = faqs;

    writeDB(db);
    res.json({ success: true });
});

// --- Auth Routes ---
app.post('/api/auth/register', (req, res) => {
    const db = readDB();
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const users = db.users || [];
    if (users.find(u => u.identifier === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = {
        id: Date.now().toString(),
        name: `${firstName} ${lastName}`,
        identifier: email,
        password: password, // In production, hash this!
        role: 'customer'
    };

    db.users = [...users, newUser];
    writeDB(db);

    // Return user without password
    const { password: _, ...userWithoutPass } = newUser;
    res.status(201).json({ success: true, user: userWithoutPass });
});

app.post('/api/auth/login', (req, res) => {
    const db = readDB();
    const { email, password } = req.body;

    // Check Admin
    const creds = db.adminCredentials;
    if (creds && email === creds.email && password === creds.password) {
        return res.json({
            success: true,
            user: {
                id: 'admin-1',
                name: 'Administrator',
                email: email,
                role: 'admin'
            }
        });
    }

    // Check Customer
    const users = db.users || [];
    const customer = users.find(u => u.identifier === email && u.password === password);

    if (customer) {
        const { password: _, ...userWithoutPass } = customer;
        return res.json({
            success: true,
            user: userWithoutPass
        });
    }

    res.status(401).json({ success: false, error: 'Invalid credentials' });
});

// --- Hero Slider Routes ---
app.get('/api/hero-slides', (req, res) => {
    const db = readDB();
    if (!db.heroSlides || db.heroSlides.length === 0) {
        const defaultSlides = [
            { id: 1, image: '/hero1.jpg', caption: 'ELEGANCE MEETS STYLE' },
            { id: 2, image: '/hero2.jpg', caption: 'DISCOVER YOUR LOOK' },
            { id: 3, image: '/hero3.jpg', caption: 'REDEFINE FASHION' },
            { id: 4, image: '/hero4.jpg', caption: 'SHOP THE COLLECTION' }
        ];
        db.heroSlides = defaultSlides;
        writeDB(db);
        return res.json(defaultSlides);
    }
    res.json(db.heroSlides);
});

app.post('/api/hero-slides', (req, res) => {
    const db = readDB();
    const newSlide = { ...req.body, id: Date.now() };
    db.heroSlides = [...(db.heroSlides || []), newSlide];
    writeDB(db);
    res.status(201).json(newSlide);
});

app.put('/api/hero-slides', (req, res) => {
    const db = readDB();
    const slides = req.body;
    if (!Array.isArray(slides)) {
        return res.status(400).json({ error: 'Input must be an array of slides' });
    }
    db.heroSlides = slides;
    writeDB(db);
    res.json({ success: true, slides: db.heroSlides });
});

app.put('/api/hero-slides/:id', (req, res) => {
    const db = readDB();
    const id = Number(req.params.id);
    const index = (db.heroSlides || []).findIndex(s => s.id === id);
    if (index !== -1) {
        db.heroSlides[index] = { ...db.heroSlides[index], ...req.body };
        writeDB(db);
        res.json(db.heroSlides[index]);
    } else {
        res.status(404).json({ error: 'Slide not found' });
    }
});

app.delete('/api/hero-slides/:id', (req, res) => {
    const db = readDB();
    const id = Number(req.params.id);
    db.heroSlides = (db.heroSlides || []).filter(s => s.id !== id);
    writeDB(db);
    res.json({ success: true });
});

// --- Twilio SMS ---
app.post('/send-sms', async (req, res) => {
    const { to, message } = req.body;

    if (!to || !message) {
        return res.status(400).json({ success: false, error: 'Missing "to" or "message" field' });
    }

    try {
        console.log(`Sending SMS to ${to}...`);
        const result = await client.messages.create({
            body: message,
            messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
            to: to
        });

        console.log('SMS Sent! SID:', result.sid);
        res.json({ success: true, sid: result.sid });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

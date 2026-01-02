const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_KEY in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const DB_FILE = path.join(__dirname, 'db.json');

const readLocalDB = () => {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (err) {
        console.error('Error reading db.json:', err);
        return null;
    }
};

const uploadData = async () => {
    console.log('🚀 Starting Data Migration...');
    const data = readLocalDB();

    if (!data) return;

    // 1. Users
    if (data.users && data.users.length > 0) {
        console.log(`📤 Migrating ${data.users.length} Users...`);
        const { error } = await supabase.from('users').upsert(
            data.users.map(u => ({
                name: u.name,
                identifier: u.identifier,
                password: u.password,
                role: u.role
            }))
        );
        if (error) console.error('Error uploading users:', error);
        else console.log('✅ Users migrated.');
    }

    // 2. Collections
    if (data.collections && data.collections.length > 0) {
        console.log(`📤 Migrating ${data.collections.length} Collections...`);
        const { error } = await supabase.from('collections').upsert(
            data.collections.map(c => ({
                title: c.title,
                image: c.image,
                link: c.link,
                text_position: c.textPosition,
                text_color: c.textColor
            }))
        );
        if (error) console.error('Error uploading collections:', error);
        else console.log('✅ Collections migrated.');
    }

    // 3. Offers
    if (data.offers && data.offers.length > 0) {
        console.log(`📤 Migrating ${data.offers.length} Offers...`);
        const { error } = await supabase.from('offers').upsert(
            data.offers.map(o => ({
                title: o.title,
                discount_percentage: o.discountPercentage,
                description: o.description,
                image: o.image
            }))
        );
        if (error) console.error('Error uploading offers:', error);
        else console.log('✅ Offers migrated.');
    }

    // 4. Hero Slides
    if (data.heroSlides && data.heroSlides.length > 0) {
        console.log(`📤 Migrating ${data.heroSlides.length} Hero Slides...`);
        const { error } = await supabase.from('hero_slides').upsert(
            data.heroSlides.map(h => ({
                image: h.image,
                caption: h.caption
            }))
        );
        if (error) console.error('Error uploading hero slides:', error);
        else console.log('✅ Hero Slides migrated.');
    }

    console.log('✨ Migration Complete!');
};

uploadData();

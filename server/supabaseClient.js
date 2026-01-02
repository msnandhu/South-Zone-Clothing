require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nzxiebgevithkwnwikct.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
    console.error('⚠️  SUPABASE_KEY is missing in .env file!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };

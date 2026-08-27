const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('[Supabase] Client initialized successfully with URL:', supabaseUrl);
  } catch (err) {
    console.error('[Supabase Error] Failed to initialize client:', err.message);
  }
} else {
  console.log('[Supabase] SUPABASE_URL or SUPABASE_KEY not set. Operating with local database storage.');
}

function isSupabaseConfigured() {
  return !!supabase;
}

module.exports = {
  supabase,
  isSupabaseConfigured
};

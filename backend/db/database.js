const fs = require('fs');
const path = require('path');
const initialData = require('./seedData');
const { supabase, isSupabaseConfigured } = require('./supabaseClient');

const DB_PATH = path.join(__dirname, 'data.json');
let cachedDb = null;

// Initialize local database file if it does not exist
function initDb() {
  if (!fs.existsSync(DB_PATH)) {
    console.log('[DB] Initializing new local database file with seed data...');
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    } catch (e) {
      console.warn('[DB] Read-only filesystem detected, using memory cache.');
    }
  }
}

// Fetch DB state from Supabase table 'app_store' (key: 'main')
async function fetchFromSupabase() {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase
      .from('app_store')
      .select('data')
      .eq('id', 'main')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('[Supabase Error] Error fetching state:', error.message);
      return null;
    }

    if (data && data.data) {
      console.log('[Supabase] Successfully fetched database state from cloud.');
      cachedDb = data.data;
      return cachedDb;
    } else {
      // First time initialization in Supabase
      console.log('[Supabase] Initializing new cloud state in table app_store...');
      await syncToSupabase(initialData);
      cachedDb = initialData;
      return cachedDb;
    }
  } catch (err) {
    console.error('[Supabase Error] Failed to query cloud database:', err.message);
    return null;
  }
}

// Sync DB state to Supabase table 'app_store'
async function syncToSupabase(dbData) {
  if (!isSupabaseConfigured()) return false;

  try {
    const { error } = await supabase
      .from('app_store')
      .upsert({
        id: 'main',
        data: dbData,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('[Supabase Error] Upsert error:', error.message);
      return false;
    }

    console.log('[Supabase] Successfully synced database changes to cloud.');
    return true;
  } catch (err) {
    console.error('[Supabase Error] Failed to sync to cloud database:', err.message);
    return false;
  }
}

// Read database contents (Synchronous with memory cache & local file fallback)
function readDb() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    initDb();
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      cachedDb = JSON.parse(raw);
      return cachedDb;
    }
  } catch (err) {
    console.error('[DB Error] Failed to read local database, using seed data:', err.message);
  }

  cachedDb = initialData;
  return cachedDb;
}

// Write database contents (Updates cache, local file & pushes to Supabase)
function writeDb(data) {
  cachedDb = data;

  try {
    if (fs.existsSync(DB_PATH) || process.env.NODE_ENV !== 'production') {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('[DB] Local write omitted (read-only filesystem):', err.message);
  }

  if (isSupabaseConfigured()) {
    syncToSupabase(data).catch(err => {
      console.error('[Supabase Background Error]', err.message);
    });
  }

  return true;
}

// Pre-load data from Supabase on module import if credentials exist
if (isSupabaseConfigured()) {
  fetchFromSupabase().catch(err => console.error('[Supabase Init Error]', err.message));
}

module.exports = {
  readDb,
  writeDb,
  fetchFromSupabase,
  syncToSupabase,
  isSupabaseConfigured
};

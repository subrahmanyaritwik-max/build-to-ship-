const fs = require('fs');
const path = require('path');
const initialData = require('./seedData');

const DB_PATH = path.join(__dirname, 'data.json');

// Initialize database file if it does not exist
function initDb() {
  if (!fs.existsSync(DB_PATH)) {
    console.log('[DB] Initializing new database file with seed data...');
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

// Read database contents
function readDb() {
  try {
    initDb();
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[DB Error] Failed to read database, falling back to seed data:', err);
    return initialData;
  }
}

// Write database contents
function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[DB Error] Failed to write database:', err);
    return false;
  }
}

module.exports = {
  readDb,
  writeDb
};

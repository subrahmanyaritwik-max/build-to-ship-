const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../db/database');

// GET /api/sessions
router.get('/', (req, res) => {
  const db = readDb();
  res.json(db.sessions || []);
});

// POST /api/sessions - log focus study session
router.post('/', (req, res) => {
  const db = readDb();
  const { taskTitle, durationMinutes, type } = req.body;

  const newSession = {
    id: 's_' + Date.now(),
    taskTitle: taskTitle || 'General Study',
    durationMinutes: Number(durationMinutes) || 25,
    type: type || 'Pomodoro',
    timestamp: new Date().toISOString()
  };

  db.sessions = [newSession, ...(db.sessions || [])];
  
  // Update total focus time in userStats
  db.userStats = db.userStats || {};
  db.userStats.totalFocusMinutes = (db.userStats.totalFocusMinutes || 0) + newSession.durationMinutes;
  
  writeDb(db);

  res.status(201).json(newSession);
});

module.exports = router;

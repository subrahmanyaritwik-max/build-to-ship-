const express = require('express');
const router = express.Router();
const { readDb } = require('../db/database');

// GET /api/stats
router.get('/', (req, res) => {
  const db = readDb();
  const tasks = db.tasks || [];
  const sessions = db.sessions || [];
  const userStats = db.userStats || {};

  const totalFocusMinutes = sessions.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0) + (userStats.totalFocusMinutes || 0);
  const tasksCompleted = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status !== 'Completed').length;

  res.json({
    studyStreakDays: userStats.studyStreakDays || 5,
    totalFocusMinutes,
    tasksCompleted,
    pendingTasks,
    totalGuidesAvailable: (db.guides || []).length,
    totalFlashcards: (db.flashcards || []).length,
    quizzesMastered: userStats.quizzesMastered || 2
  });
});

module.exports = router;

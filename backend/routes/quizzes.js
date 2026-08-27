const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../db/database');

// GET /api/quizzes - list available quizzes
router.get('/', (req, res) => {
  const db = readDb();
  res.json(db.quizzes || []);
});

// GET /api/quizzes/:id - get specific quiz
router.get('/:id', (req, res) => {
  const db = readDb();
  const quiz = (db.quizzes || []).find(q => q.id === req.params.id);
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }
  res.json(quiz);
});

// POST /api/quizzes/:id/submit - evaluate quiz score
router.post('/:id/submit', (req, res) => {
  const db = readDb();
  const quiz = (db.quizzes || []).find(q => q.id === req.params.id);
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }

  const { userAnswers } = req.body; // array of indexes: [0, 1, 1]
  if (!userAnswers || !Array.isArray(userAnswers)) {
    return res.status(400).json({ error: 'userAnswers array is required' });
  }

  let score = 0;
  const results = quiz.questions.map((q, idx) => {
    const selected = userAnswers[idx];
    const isCorrect = selected === q.correctAnswer;
    if (isCorrect) score++;

    return {
      questionId: q.id,
      selectedOption: selected,
      correctOption: q.correctAnswer,
      isCorrect,
      explanation: q.explanation
    };
  });

  const percentage = Math.round((score / quiz.questions.length) * 100);

  // Update user stats
  if (percentage >= 70) {
    db.userStats = db.userStats || {};
    db.userStats.quizzesMastered = (db.userStats.quizzesMastered || 0) + 1;
    writeDb(db);
  }

  res.json({
    quizId: quiz.id,
    score,
    totalQuestions: quiz.questions.length,
    percentage,
    passed: percentage >= 70,
    results
  });
});

module.exports = router;

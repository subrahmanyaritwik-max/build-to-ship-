const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../db/database');

// GET /api/flashcards
router.get('/', (req, res) => {
  const db = readDb();
  const deck = req.query.deck;
  let flashcards = db.flashcards || [];

  if (deck) {
    flashcards = flashcards.filter(f => f.deck.toLowerCase() === deck.toLowerCase());
  }

  res.json(flashcards);
});

// POST /api/flashcards - create flashcard
router.post('/', (req, res) => {
  const db = readDb();
  const { deck, question, answer, difficulty } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and Answer are required' });
  }

  const newCard = {
    id: 'f_' + Date.now(),
    deck: deck || 'General Fundamentals',
    question,
    answer,
    difficulty: difficulty || 'Medium'
  };

  db.flashcards = [...(db.flashcards || []), newCard];
  writeDb(db);

  res.status(201).json(newCard);
});

module.exports = router;

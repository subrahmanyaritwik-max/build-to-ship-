const express = require('express');
const router = express.Router();
const { readDb } = require('../db/database');

// GET /api/guides - list all guides with optional category filtering
router.get('/', (req, res) => {
  const db = readDb();
  let guides = db.guides || [];
  const { category, search } = req.query;

  if (category && category !== 'All') {
    guides = guides.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    guides = guides.filter(g => g.title.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q) || g.content.toLowerCase().includes(q));
  }

  res.json(guides);
});

// GET /api/guides/:id - get guide details
router.get('/:id', (req, res) => {
  const db = readDb();
  const guide = (db.guides || []).find(g => g.id === req.params.id);
  if (!guide) {
    return res.status(404).json({ error: 'Guide not found' });
  }
  res.json(guide);
});

module.exports = router;

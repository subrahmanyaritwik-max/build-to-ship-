const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../db/database');

// GET /api/tasks
router.get('/', (req, res) => {
  const db = readDb();
  res.json(db.tasks || []);
});

// POST /api/tasks - create new task
router.post('/', (req, res) => {
  const db = readDb();
  const { title, subject, dueDate, priority, estimatedMinutes } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: 't_' + Date.now(),
    title: title.trim(),
    subject: subject || 'General',
    dueDate: dueDate || new Date().toISOString().split('T')[0],
    priority: priority || 'Medium',
    status: 'To Do',
    estimatedMinutes: Number(estimatedMinutes) || 30,
    createdAt: new Date().toISOString()
  };

  db.tasks = [newTask, ...(db.tasks || [])];
  writeDb(db);

  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - update status or fields
router.put('/:id', (req, res) => {
  const db = readDb();
  const index = (db.tasks || []).findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = { ...db.tasks[index], ...req.body };
  db.tasks[index] = updatedTask;

  writeDb(db);
  res.json(updatedTask);
});

// DELETE /api/tasks/:id - delete task
router.delete('/:id', (req, res) => {
  const db = readDb();
  const initialLength = (db.tasks || []).length;
  db.tasks = (db.tasks || []).filter(t => t.id !== req.params.id);

  if (db.tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  writeDb(db);
  res.json({ message: 'Task deleted successfully' });
});

module.exports = router;

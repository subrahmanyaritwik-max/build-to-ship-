require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDb } = require('./db/database');

const statsRouter = require('./routes/stats');
const guidesRouter = require('./routes/guides');
const tasksRouter = require('./routes/tasks');
const flashcardsRouter = require('./routes/flashcards');
const quizzesRouter = require('./routes/quizzes');
const sessionsRouter = require('./routes/sessions');
const gpaRouter = require('./routes/gpa');

const app = express();
const PORT = process.env.PORT || 5000;
const API_SECRET_KEY = process.env.API_SECRET_KEY || '';

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

const { isSupabaseConfigured } = require('./db/supabaseClient');

// API Health Check with Secret Key verification
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    app: 'Student Fundamentals Backend API',
    supabaseConnected: isSupabaseConfigured(),
    apiKeyConfigured: !!API_SECRET_KEY
  });
});

// API Routes
app.use('/api/stats', statsRouter);
app.use('/api/guides', guidesRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/flashcards', flashcardsRouter);
app.use('/api/quizzes', quizzesRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/gpa', gpaRouter);

// Start server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Student Fundamentals Backend running at http://localhost:${PORT}`);
  console.log(`🔑 Backend Key Configured: ${API_SECRET_KEY.slice(0, 15)}...`);
  console.log(`=======================================================`);
});

const express = require('express');
const router = express.Router();

const GRADE_POINTS = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0
};

// POST /api/gpa/calculate
router.post('/calculate', (req, res) => {
  const { courses, currentGpa, currentCredits } = req.body;

  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({ error: 'Courses array is required' });
  }

  let semesterPoints = 0;
  let semesterCredits = 0;

  courses.forEach(c => {
    const grade = (c.grade || 'A').toUpperCase();
    const credits = Number(c.credits) || 3;
    const pts = GRADE_POINTS[grade] !== undefined ? GRADE_POINTS[grade] : 4.0;
    
    semesterPoints += pts * credits;
    semesterCredits += credits;
  });

  const semesterGpa = semesterCredits > 0 ? (semesterPoints / semesterCredits) : 0;

  // Cumulative GPA calculation if current state provided
  let cumulativeGpa = semesterGpa;
  let totalCredits = semesterCredits;

  if (currentGpa !== undefined && currentCredits !== undefined) {
    const existingCredits = Number(currentCredits) || 0;
    const existingGpa = Number(currentGpa) || 0;
    const existingPoints = existingGpa * existingCredits;

    totalCredits = existingCredits + semesterCredits;
    cumulativeGpa = totalCredits > 0 ? ((existingPoints + semesterPoints) / totalCredits) : 0;
  }

  res.json({
    semesterGpa: Number(semesterGpa.toFixed(2)),
    semesterCredits,
    cumulativeGpa: Number(cumulativeGpa.toFixed(2)),
    totalCredits
  });
});

module.exports = router;

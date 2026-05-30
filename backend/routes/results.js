const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const auth = require('../middleware/auth');

// Get all results for logged-in student
router.get('/', auth, async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.studentId }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get results by semester
router.get('/semester/:semester', auth, async (req, res) => {
  try {
    const results = await Result.find({
      studentId: req.studentId,
      semester: req.params.semester
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add result (Admin only)
router.post('/', async (req, res) => {
  try {
    const { studentId, courseName, courseCode, semester, academicYear, score, grade, creditHours } = req.body;

    const result = new Result({
      studentId,
      courseName,
      courseCode,
      semester,
      academicYear,
      score,
      grade,
      creditHours
    });

    await result.save();
    res.json({ message: 'Result added successfully', result });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

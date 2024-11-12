const express = require('express');
const db = require('../../config/db');

const router = express.Router();

// Middleware to verify admin API key
router.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }
});

router.post('/', (req, res) => {
  const { name, source, destination, totalSeats } = req.body;

  if (!name || !source || !destination || !totalSeats) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO trains (name, source, destination, total_seats) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, source, destination, totalSeats], (err) => {
    if (err) return res.status(500).json({ message: 'Failed to add train', error: err });
    res.status(201).json({ message: 'Train added successfully' });
  });
});

module.exports = router;

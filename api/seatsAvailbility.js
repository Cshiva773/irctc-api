const express = require('express');
const db = require('../config/database');

const router = express.Router();

router.get('/', (req, res) => {
  const { source, destination } = req.query;

  if (!source || !destination) {
    return res.status(400).json({ message: 'Source and destination are required' });
  }

  const sql = 'SELECT * FROM trains WHERE source = ? AND destination = ?';
  db.query(sql, [source, destination], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch trains', error: err });
    res.json(results);
  });
});

module.exports = router;

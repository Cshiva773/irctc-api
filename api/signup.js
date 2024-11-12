const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password didnot exist' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, hashedPassword, role || 'user'], (err) => {
      if (err) return res.status(500).json({ message: 'User registration failed', error: err });
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error hashing password', error: err });
  }
});

module.exports = router;

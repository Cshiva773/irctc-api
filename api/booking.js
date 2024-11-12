const express = require('express');
const db = require('../config/db');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
router.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
});

router.post('/', (req, res) => {
  const { trainId, seatsToBook } = req.body;

  if (!trainId || !seatsToBook) {
    return res.status(400).json({ message: 'Train ID and number of seats are required' });
  }

  db.getConnection(async (err, connection) => {
    if (err) return res.status(500).json({ message: 'Database connection failed', error: err });

    try {
      await connection.beginTransaction();

      const [train] = await connection.query('SELECT total_seats FROM trains WHERE id = ? FOR UPDATE', [trainId]);
      if (!train || train.total_seats < seatsToBook) {
        return res.status(400).json({ message: 'Insufficient seats available' });
      }

      await connection.query('UPDATE trains SET total_seats = total_seats - ? WHERE id = ?', [seatsToBook, trainId]);
      await connection.query('INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)', [req.user.id, trainId, seatsToBook]);

      await connection.commit();
      res.status(201).json({ message: 'Booking successful' });
    } catch (error) {
      await connection.rollback();
      res.status(500).json({ message: 'Booking failed', error });
    } finally {
      connection.release();
    }
  });
});

module.exports = router;

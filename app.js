require('dotenv').config();
const express = require('express');
const sql = require('./config/database');
const app = express();

app.use(express.json());



// Import routes
const signup = require('./api/signup');
const login = require('./api/login');
const seatAvailability = require('./api/seatAvailbility');
const seatInfo = require('./api/seatInfo');
const booking = require('./api/booking');
const newTrain = require('./api/admin/newTrain');

// Define routes
app.use('/signup', signup);
app.use('/login', login);
app.use('/seat-availability', seatAvailability);
app.use('/seat-info', seatInfo);
app.use('/booking', booking);
app.use('/admin/new-train', newTrain);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

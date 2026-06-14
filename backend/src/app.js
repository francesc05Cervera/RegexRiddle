require('dotenv').config();

const express = require('express');

const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const challengeRoutes = require('./routes/challenge.routes');

const app = express();

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend collegato correttamente' });
});

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/challenge', challengeRoutes);

module.exports = app;
require('dotenv').config();
require('./models/user');
require('./models/challenge');
require('./models/attempt');

const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const challengeRoutes = require('./routes/challenge.routes');

const app = express();
const sequelize = require('../db');

sequelize.sync().then(() => console.log('✅ Database SQLite sincronizzato'));

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend collegato correttamente' });
});

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/challenge', challengeRoutes);

module.exports = app;
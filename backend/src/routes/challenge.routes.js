const express = require('express');
const { createChallenge } = require('../controllers/challenge.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authenticateToken, createChallenge);

module.exports = router;
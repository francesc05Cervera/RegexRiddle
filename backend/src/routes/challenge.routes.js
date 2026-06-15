const express = require('express');
const { createChallenge, getAllChallenges } = require('../controllers/challenge.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authenticateToken, getAllChallenges);
router.post('/', authenticateToken, createChallenge);

module.exports = router;
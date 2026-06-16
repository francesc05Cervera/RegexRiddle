const express = require('express');
const { createChallenge, getAllChallenges, getChallengeById, submitAttempt, getLeaderboard } = require('../controllers/challenge.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/leaderboard', authenticateToken, getLeaderboard);
router.get('/', authenticateToken, getAllChallenges);
router.get('/:id', authenticateToken, getChallengeById);
router.post('/', authenticateToken, createChallenge);
router.post('/:id/attempt', authenticateToken, submitAttempt);

module.exports = router;
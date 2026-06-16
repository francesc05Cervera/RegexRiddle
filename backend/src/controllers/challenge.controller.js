const { Op, Sequelize } = require('sequelize');
const Challenge = require('../models/challenge');
const Attempt = require('../models/attempt');
const User = require('../models/user');

const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.findAll({
      attributes: { exclude: ['secretRegex', 'positiveControls', 'negativeControls'] }
    });
    return res.status(200).json(challenges);
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id, {
      attributes: { exclude: ['secretRegex', 'positiveControls', 'negativeControls'] }
    });
    if (!challenge) return res.status(404).json({ message: 'Challenge non trovata' });
    return res.status(200).json(challenge);
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

const createChallenge = async (req, res) => {
  try {
    const { secretRegex, positiveExample, negativeExample, positiveControls, negativeControls } = req.body;
    if (!secretRegex || !positiveExample || !negativeExample ||
        !Array.isArray(positiveControls) || !Array.isArray(negativeControls))
      return res.status(400).json({ message: 'Tutti i campi della challenge sono obbligatori' });

    const newChallenge = await Challenge.create({
      authorId: req.user.id,
      secretRegex: secretRegex.trim(),
      positiveExample: positiveExample.trim(),
      negativeExample: negativeExample.trim(),
      positiveControls,
      negativeControls,
    });
    return res.status(201).json({ message: 'Challenge creata con successo', challenge: newChallenge });
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

const submitAttempt = async (req, res) => {
  try {
    const { id } = req.params;
    const { regex } = req.body;
    if (!regex) return res.status(400).json({ message: 'La regex è obbligatoria' });

    const challenge = await Challenge.findByPk(id);
    if (!challenge) return res.status(404).json({ message: 'Challenge non trovata' });

    let userRegex;
    try { userRegex = new RegExp(regex); }
    catch (e) { return res.status(400).json({ message: 'Regex non valida' }); }

    const positiveResults = challenge.positiveControls.map(str => ({
      input: str, expected: true, actual: userRegex.test(str),
    }));
    const negativeResults = challenge.negativeControls.map(str => ({
      input: str, expected: false, actual: userRegex.test(str),
    }));

    const allResults = [...positiveResults, ...negativeResults];
    const passed = allResults.every(r => r.expected === r.actual);

    await Attempt.create({ userId: req.user.id, challengeId: id, regex, passed });

    return res.status(200).json({ passed, results: allResults });
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const solvedRows = await Attempt.findAll({
      attributes: [
        'userId',
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('Attempt.challengeId'))), 'solved'],
      ],
      where: { passed: true },
      include: [{ model: User, as: 'user', attributes: ['username', 'avatarUrl'] }],
      group: ['userId', 'user.id'],
      raw: false,
    });

    const result = await Promise.all(solvedRows.map(async (row) => {
      const totalAttempts = await Attempt.count({ where: { userId: row.userId } });
      const solved = parseInt(row.getDataValue('solved'));
      return {
        username: row.user.username,
        avatarUrl: row.user.avatarUrl,
        solved,
        avgAttempts: solved > 0 ? (totalAttempts / solved).toFixed(1) : '-',
      };
    }));

    result.sort((a, b) => b.solved - a.solved || parseFloat(a.avgAttempts) - parseFloat(b.avgAttempts));

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

module.exports = { getAllChallenges, getChallengeById, createChallenge, submitAttempt, getLeaderboard };
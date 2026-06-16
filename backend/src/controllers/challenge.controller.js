const { randomUUID } = require('crypto');
const { challenges } = require('../store/challenges.data');

const getAllChallenges = async (req, res) => {
  try {
    const publicChallenges = challenges.map(({ secretRegex, positiveControls, negativeControls, ...rest }) => rest);
    return res.status(200).json(publicChallenges);
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = challenges.find(c => c.id === id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge non trovata' });
    }

    const { secretRegex, positiveControls, negativeControls, ...publicChallenge } = challenge;
    return res.status(200).json(publicChallenge);
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

const createChallenge = async (req, res) => {
  try {
    const { secretRegex, positiveExample, negativeExample, positiveControls, negativeControls } = req.body;

    if (!secretRegex || !positiveExample || !negativeExample ||
        !Array.isArray(positiveControls) || !Array.isArray(negativeControls)) {
      return res.status(400).json({ message: 'Tutti i campi della challenge sono obbligatori' });
    }

    const newChallenge = {
      id: randomUUID(),
      authorId: req.user.id,
      secretRegex: secretRegex.trim(),
      positiveExample: positiveExample.trim(),
      negativeExample: negativeExample.trim(),
      positiveControls,
      negativeControls,
      createdAt: new Date().toISOString(),
    };

    challenges.push(newChallenge);
    return res.status(201).json({ message: 'Challenge creata con successo', challenge: newChallenge });
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

const submitAttempt = async (req, res) => {
  try {
    const { id } = req.params;
    const { regex } = req.body;

    if (!regex) {
      return res.status(400).json({ message: 'La regex è obbligatoria' });
    }

    const challenge = challenges.find(c => c.id === id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge non trovata' });
    }

    let userRegex;
    try {
      userRegex = new RegExp(regex);
    } catch (e) {
      return res.status(400).json({ message: 'Regex non valida' });
    }

    const positiveResults = challenge.positiveControls.map(str => ({
      input: str,
      expected: true,
      actual: userRegex.test(str),
    }));

    const negativeResults = challenge.negativeControls.map(str => ({
      input: str,
      expected: false,
      actual: userRegex.test(str),
    }));

    const allResults = [...positiveResults, ...negativeResults];
    const passed = allResults.every(r => r.expected === r.actual);

    return res.status(200).json({ passed, results: allResults });
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

module.exports = { getAllChallenges, getChallengeById, createChallenge, submitAttempt };
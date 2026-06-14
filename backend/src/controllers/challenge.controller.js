const { randomUUID } = require('crypto');
const { challenges } = require('../store/challenges.data');

const createChallenge = async (req, res) => {
  try {
    const {
      secretRegex,
      positiveExample,
      negativeExample,
      positiveControls,
      negativeControls,
    } = req.body;

    if (
      !secretRegex ||
      !positiveExample ||
      !negativeExample ||
      !Array.isArray(positiveControls) ||
      !Array.isArray(negativeControls)
    ) {
      return res.status(400).json({
        message: 'Tutti i campi della challenge sono obbligatori',
      });
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

    return res.status(201).json({
      message: 'Challenge creata con successo',
      challenge: newChallenge,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Errore interno del server',
    });
  }
};

module.exports = {
  createChallenge,
};
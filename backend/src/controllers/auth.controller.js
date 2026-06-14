const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const { users } = require('../store/users.data');

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const sanitizeUser = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
  };
};

const register = async (req, res) => {
  try {
    const { username, email, password, avatarUrl } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'username, email e password sono obbligatori',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      return res.status(409).json({
        message: 'Email già registrata',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: randomUUID(),
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      avatarUrl: avatarUrl?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    const token = createToken(newUser);

    return res.status(201).json({
      message: 'Registrazione completata',
      token,
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Errore interno del server',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'email e password sono obbligatori',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
      (currentUser) => currentUser.email.toLowerCase() === normalizedEmail
    );

    if (!user) {
      return res.status(401).json({
        message: 'Credenziali non valide',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Credenziali non valide',
      });
    }

    const token = createToken(user);

    return res.status(200).json({
      message: 'Login effettuato',
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Errore interno del server',
    });
  }
};

const me = async (req, res) => {
  try {
    const user = users.find((currentUser) => currentUser.id === req.user.id);

    if (!user) {
      return res.status(404).json({
        message: 'Utente non trovato',
      });
    }

    return res.status(200).json({
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Errore interno del server',
    });
  }
};

module.exports = {
  register,
  login,
  me,
};
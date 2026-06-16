const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  avatarUrl: user.avatarUrl,
  createdAt: user.createdAt,
});

const register = async (req, res) => {
  try {
    const { username, email, password, avatarUrl } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'username, email e password sono obbligatori' });

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ where: { email: normalizedEmail } });
    if (existing)
      return res.status(409).json({ message: 'Email già registrata' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      avatarUrl: avatarUrl?.trim() || null,
    });

    return res.status(201).json({ message: 'Registrazione completata', token: createToken(newUser), user: sanitizeUser(newUser) });
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'email e password sono obbligatori' });

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) return res.status(401).json({ message: 'Credenziali non valide' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Credenziali non valide' });

    return res.status(200).json({ message: 'Login effettuato', token: createToken(user), user: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utente non trovato' });
    return res.status(200).json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};

module.exports = { register, login, me };
const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  avatarUrl: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: true, createdAt: 'createdAt', updatedAt: false });

module.exports = User;
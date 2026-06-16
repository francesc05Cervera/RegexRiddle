const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Attempt = sequelize.define('Attempt', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  userId: { type: DataTypes.UUID, allowNull: false },
  challengeId: { type: DataTypes.UUID, allowNull: false },
  regex: { type: DataTypes.STRING, allowNull: false },
  passed: { type: DataTypes.BOOLEAN, allowNull: false },
}, { timestamps: true, createdAt: 'createdAt', updatedAt: false });

module.exports = Attempt;
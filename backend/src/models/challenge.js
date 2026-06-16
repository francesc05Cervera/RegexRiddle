const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Challenge = sequelize.define('Challenge', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  authorId: { type: DataTypes.UUID, allowNull: false },
  secretRegex: { type: DataTypes.STRING, allowNull: false },
  positiveExample: { type: DataTypes.STRING, allowNull: false },
  negativeExample: { type: DataTypes.STRING, allowNull: false },
  positiveControls: { type: DataTypes.JSON, allowNull: false },
  negativeControls: { type: DataTypes.JSON, allowNull: false },
}, { timestamps: true, createdAt: 'createdAt', updatedAt: false });

module.exports = Challenge;
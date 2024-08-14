const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  aufgabe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  erledigt: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  bereich: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zu_erledigen_bis: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tage_verbleibend: {
    type: DataTypes.VIRTUAL,
    get() {
      const diffTime = new Date(this.zu_erledigen_bis) - new Date();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
  },
  stunden_geplant: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stunden_verwendet: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  stunden_verbleibend: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.stunden_geplant - this.stunden_verwendet;
    },
  },
});

module.exports = Task;

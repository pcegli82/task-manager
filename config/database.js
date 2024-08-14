const { Sequelize } = require('sequelize');

// Hier konfigurieren wir die Datenbankverbindung
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',  // Stelle sicher, dass der Dialekt auf 'postgres' gesetzt ist
  port: process.env.DB_PORT || 5432,  // Der Standardport für PostgreSQL ist 5432
});

module.exports = sequelize;
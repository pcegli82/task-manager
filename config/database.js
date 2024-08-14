const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Dies ist notwendig, um selbstsignierte Zertifikate zu akzeptieren
    }
  },
  logging: false,  // Optional: Deaktiviert das Logging für eine saubere Konsole
});

module.exports = sequelize;

const { Sequelize } = require('sequelize');
const config = require('./config/config');

const credentials = config[process.env.APP_ENV || 'development'];

const sequelize = new Sequelize(credentials);

module.exports = sequelize;

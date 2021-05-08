require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('./config/config');

const sequelize = new Sequelize(config[process.env.APP_ENV || 'test']);

module.exports = sequelize;

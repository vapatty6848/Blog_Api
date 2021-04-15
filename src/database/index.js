const { Sequelize } = require('sequelize');

const config = require('./config/config');

const enviromentPermission = config.development;

const sequelize = new Sequelize(enviromentPermission);

module.exports = sequelize;

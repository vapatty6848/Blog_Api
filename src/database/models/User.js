const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
}, { timestamps: false, tableName: 'Users' });

module.exports = User;

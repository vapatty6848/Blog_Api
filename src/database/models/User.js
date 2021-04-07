const { DataTypes } = require('sequelize');

const sequelize = require('../index');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  displayName: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
}, {
  tableName: 'Users',
  timestamps: false,
});

module.exports = User;

'use strict';

const sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
  const UsersTable = queryInterface.createTable('Users', { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    displayName: {
      type: Sequelize.STRING,
      allowNull: false, 
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
     type: Sequelize.STRING,
     allowNull: false,
   }
  })
  return UsersTable
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable('Users');
  }
};

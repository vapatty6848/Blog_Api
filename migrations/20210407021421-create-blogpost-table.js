'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.createTable('Blogposts', {
     id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    published: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    updated: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
    },
  })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Blogposts');
  }
};

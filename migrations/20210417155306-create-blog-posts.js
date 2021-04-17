'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        primaryKey: true,
        allowNull: false,
        // type: Sequelize.UUID,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        required: true
      }
    },
    { timestamps: false }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
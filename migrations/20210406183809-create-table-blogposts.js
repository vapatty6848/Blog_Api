'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      title: {allowNull: false, type: Sequelize.STRING},
      content: {allowNull: false, type: Sequelize.STRING},
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        referencer: {model: 'Users', key: 'id'}
      },
      published: {allowNull: false, type: Sequelize.DATE},
      updated: {allowNull: true, type: Sequelize.DATE},
    })
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('BlogPosts')
  }
};

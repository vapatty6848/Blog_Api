'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsTable = queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', Key: 'id' }
      },
      published: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updated: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
    });

    return PostsTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('BlogPosts');
  }
};

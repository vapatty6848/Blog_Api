module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = await queryInterface.createTable('BlogPosts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Users' }, key: 'id' },
      },
      published: { type: Sequelize.DATE },
      updated: { type: Sequelize.DATE },
    });

    return BlogPostsTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('BlogPosts'),
};

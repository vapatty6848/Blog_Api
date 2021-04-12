module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('BlogPosts', [
      {
        id: 1,
        title: 'Latest updates, August 1st',
        content: 'The whole text for the blog post goes here in this key',
        userId: 1,
        published: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 2,
        title: 'Latest updates, August 2st',
        content: 'The whole text for the blog post goes here in this key',
        userId: 1,
        published: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('BlogPosts', null, {});
  },
};

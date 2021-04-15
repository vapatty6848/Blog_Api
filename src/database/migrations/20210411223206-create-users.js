module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      displayName: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
    });

    return UsersTable;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};

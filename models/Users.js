const Users = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  });

  users.associate = (models) => {
    users.hasOne(models.Posts,
      { foreignKey: 'id', as: 'userId' });
  };

  return users;
};

module.exports = Users;

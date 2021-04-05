const Users = (sequelize, DataTypes) => {
  const userModel = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  userModel.associate = (models) => {
    userModel.hasMany(models.BlogPosts,
      { foreignKey: 'id', as: 'posts' });
  };

  return userModel;
};

module.exports = Users;

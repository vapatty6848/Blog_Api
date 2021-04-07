const createUser = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  Users.associate = (models) => {
    Users.hasOne(models.BlogPosts, { foreignKey: 'userId', as: 'user' });
  };

  return Users;
};

module.exports = createUser;

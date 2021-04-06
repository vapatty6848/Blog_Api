const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  User.associate = (model) => {
    User.hasMany(model.BlogPosts, { foreignKey: 'userId', as: 'blogposts' });
  };
  return User;
};

module.exports = createUser;

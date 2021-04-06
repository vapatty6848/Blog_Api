const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  user.associate = (model) => {
    user.hasMany(model.Posts, { foreignKey: 'userId', as: 'blogposts' });
  };

  return user;
};

module.exports = User;
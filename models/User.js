const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  user.associate = (model) => {
    user.hasMany(model.BlogPosts, { foreignKey: 'userId', as: 'blogposts' });
  };
  // hasMany - A chave estrangeira será definida no modelo de destino

  return user;
};

module.exports = User;

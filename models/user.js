const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, { foreignKey: 'id', as: 'users' });
  };

  return user;
};

module.exports = User;

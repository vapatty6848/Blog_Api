const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  user.associate = (models) => {
    user.hasMany(models.User, { foreignKey: 'id', as: 'user' });
  };
  return user;
};

module.exports = User;

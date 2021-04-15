const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  user.associate = (models) => {
    user.hasMany(models.blogpost,
      { foreignKey: 'userId', as: 'blogPosts' });
  };

  return user;
};

module.exports = User;

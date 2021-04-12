const User = (sequelize, DataTypes) => {
  const UserSchema = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  User.associate = (models) => {
    User.hasMany(models.BlogPosts,
      { foreignKey: 'userId', as: 'userId' });
  };

  return UserSchema;
};

module.exports = User;

const User = (sequelize, DataTypes) => {
  const UserSchema = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  UserSchema.associate = (models) => {
    UserSchema.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'posts' });
  };

  return UserSchema;
};

module.exports = User;

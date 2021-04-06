const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  User.associate = (models) => {
    User.hasMany(
      models.BlogPosts,
      { foreignKey: 'id', as: 'blogposts' },
    );
  };

  return User;
};

module.exports = createUser;

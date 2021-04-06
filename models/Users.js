exports.User = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
    id: { type: Datatypes.INTEGER, primaryKey: true },
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  });

  User.associate = (models) => {
    User.hasOne(models.BlogPosts,
      { foreignKey: 'userId', as: 'blogPosts' });
  }

  return User;
};

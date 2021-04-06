const User = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
    id: { type: Datatypes.INTEGER, primaryKey: true },
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  }, { timestamps: false });

  User.associate = (models) => {
    User.hasOne(models.BlogPost,
      { foreignKey: 'userId', as: 'blogPosts' });
  };

  return User;
};

module.exports = User;

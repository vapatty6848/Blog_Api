const User = (sequelize, Datatypes) => {
  const Users = sequelize.define('User', {
    id: { type: Datatypes.INTEGER, primaryKey: true },
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  }, { timestamps: false });

  Users.associate = (models) => {
    Users.hasOne(models.BlogPost,
      { foreignKey: 'userId', as: 'blogPosts' });
  };

  return Users;
};

module.exports = User;

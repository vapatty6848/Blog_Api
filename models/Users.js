const createUsers = (sequelize, Datatypes) => {
  const Users = sequelize.define('Users', {
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  },
  { timestamps: false });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts, { as: 'posts', foreignKey: 'userId' });
  };

  return Users;
};

module.exports = createUsers;

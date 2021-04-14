const createUser = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  }, {
    timestamps: false });
  User.associate = (models) => {
    User.hasMany(models.BlogPosts, {
      foreignKey: 'userId', as: 'blogposts',
    });
  };
  return User;
};

module.exports = createUser;

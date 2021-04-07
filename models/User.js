const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
  });

  return User;
};

module.exports = createUser;

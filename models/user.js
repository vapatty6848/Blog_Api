const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: { type: DataTypes.STRING, validate: { len: [8, 50] } },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, validate: { len: [6, 50] } },
    image: DataTypes.STRING,
  });

  return User;
};

module.exports = createUser;

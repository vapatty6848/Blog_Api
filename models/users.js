const Users = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return User;
};

module.exports = Users;
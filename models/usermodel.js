const User = (sequelize, DataTypes) => {
  const UserSchema = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  return UserSchema;
};

module.exports = User;

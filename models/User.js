module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    email: DataTypes.STRING,
    displayName: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Users.associate = (models) => {
    Users.hasOne(models.BlogPost,
      { foreignKey: 'userId' });
    // { foreignKey: 'userId', as: 'user' });
  };

  return Users;
};

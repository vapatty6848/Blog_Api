const Users = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, { timestamps: false });

  users.associate = (models) => {
    users.hasOne(models.BlogPosts,
      { foreignKey: 'userId', as: 'user' });
  };

  return users;
};

module.exports = Users;

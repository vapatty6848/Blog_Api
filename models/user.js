const User = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPosts, { foreignKey: 'id', as: 'user' });
  };
  return UserTable;
};

module.exports = User;

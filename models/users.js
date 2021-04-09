const Users = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  user.associate = (models) => {
    user.hasMany(models.BlogPosts,
      { foreignKey: 'userId', as: 'posts' });
    return user;
  };

  return user;
};

module.exports = Users;

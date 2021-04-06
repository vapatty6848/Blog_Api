const createUser = (sequelize, DataTypes) => {
  const blogUser = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  blogUser.associate = (models) => {
    blogUser.hasMany(models.BlogPosts,
      { foreignKey: 'userId', as: 'posts' });
    return blogUser;
  };

  return blogUser;
};

module.exports = createUser;

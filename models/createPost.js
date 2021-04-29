const createPost = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return blogPosts;
};

module.exports = createPost;

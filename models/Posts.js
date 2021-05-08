const BlogPosts = (sequelize, DataTypes) => {
  const posts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  posts.associate = (models) => {
    posts.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return posts;
};

module.exports = BlogPosts;

const Post = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
    return blogPost;
  };

  return blogPost;
};

module.exports = Post;

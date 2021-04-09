const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return blogPost;
};

module.exports = BlogPost;

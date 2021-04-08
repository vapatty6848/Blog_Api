const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('User', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };
  return blogPost;
};

module.exports = BlogPost;

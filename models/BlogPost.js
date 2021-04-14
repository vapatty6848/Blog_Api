const createBlogPost = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  blogPosts.associate = (model) => {
    blogPosts.belongsTo(model.User, { foreignKey: 'userId', as: 'user' });
  };
  return blogPosts;
};

module.exports = createBlogPost;

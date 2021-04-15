const Blog = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    publish: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamp: false });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return blogPosts;
};

module.exports = Blog;

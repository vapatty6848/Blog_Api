const Blog = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return blogPosts;
};

module.exports = Blog;

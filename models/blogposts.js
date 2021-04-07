const BlogPosts = (sequelize, DataTypes) => {
  const blogPostsModel = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  });

  return blogPostsModel;
};

module.exports = BlogPosts;

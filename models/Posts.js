const BlogPostsModel = (sequelize, DataTypes) => {
  const posts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return posts;
};

module.exports = BlogPostsModel;

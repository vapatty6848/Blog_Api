const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    content: DataTypes.STRING,
    updated: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    published: DataTypes.DATE,
  });

  return BlogPosts;
};

module.exports = BlogPost;

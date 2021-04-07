const BlogPosts = (sequelize, DataTypes) => {
  const User = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  }, { timestamps: false });

  return User;
};

module.exports = BlogPosts;

const BlogPosts = (sequelize, DataTypes) => {
  const User = sequelize.define("BlogPosts", {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  });

  return User;
};

module.exports = BlogPosts;
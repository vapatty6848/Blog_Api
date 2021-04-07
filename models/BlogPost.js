const { Sequelize } = require('sequelize');

const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: Sequelize.DATE,
    updated: Sequelize.DATE,
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return BlogPosts;
};

module.exports = BlogPost;

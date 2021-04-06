const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  });

  blogPost.associate = (model) => {
    blogPost.belongsTo(model.User, { foreignKey: 'userId', as: 'user' });
  };

  return BlogPost;
};

module.exports = BlogPost;

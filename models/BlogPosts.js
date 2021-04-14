const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  blogPosts.associate = (model) => {
    blogPosts.belongsTo(model.Users, { foreignKey: 'userId', as: 'user' });
  };

  return blogPosts;
};

module.exports = BlogPosts;

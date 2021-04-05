const BlogPosts = (sequelize, DataTypes) => {
  const blogposts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  blogposts.associate = (model) => {
    blogposts.belongsTo(model.User, { foreignKey: 'userId', as: 'User' });
  };
  // belongsTo - Crie uma nova instância do modelo associado e associe-a a este.

  return blogposts;
};

module.exports = BlogPosts;

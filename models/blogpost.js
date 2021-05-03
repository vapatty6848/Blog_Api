const blogPosts = (sequelize, Datatypes) => {
  const posts = sequelize.define('BlogPosts', {
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
  });

  posts.associate = (models) => {
    posts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return posts;
};

module.exports = blogPosts;
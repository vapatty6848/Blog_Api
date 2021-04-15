const createPosts = (sequelize, Datatypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return BlogPosts;
};

module.exports = createPosts;

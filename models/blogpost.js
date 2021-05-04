const BlogPost = (sequelize, Datatypes) => {
  const posts = sequelize.define('BlogPost', {
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
  });

  posts.associate = (models) => {
    posts.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return posts;
};

module.exports = BlogPost;

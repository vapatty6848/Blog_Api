exports.BlogPost = (sequelize, Datatypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: Datatypes.INTEGER, primaryKey: true },
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: { type: Datatypes.INTEGER, foreignKey: true },
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'blogPosts' });
  };

  return BlogPost;
};

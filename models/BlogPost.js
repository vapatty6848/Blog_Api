const BlogPost = (sequelize, Datatypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    id: { type: Datatypes.INTEGER, primaryKey: true },
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: { type: Datatypes.INTEGER, foreignKey: true },
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
  }, { timestamps: false });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User,
      { foreignKey: 'userId', as: 'blogPosts' });
  };

  return BlogPosts;
};

module.exports = BlogPost;

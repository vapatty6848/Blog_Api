const createBlogPosts = (sequelize, Datatypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: Datatypes.INTEGER,
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
  },
  { timestamps: false });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPosts;
};

module.exports = createBlogPosts;

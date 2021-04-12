const createBlogPosts = (sequelize, Datatypes) => {
  const posts = sequelize.define('BlogPosts', {
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: Datatypes.INTEGER,
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
  },
  { timestamps: false });

  return posts;
};

module.exports = createBlogPosts;

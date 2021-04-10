const createBlogPost = (sequelize, Datatypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: Datatypes.INTEGER,
    published: Datatypes.STRING,
  }, { timestamps: false });

  return BlogPost;
};

module.exports = createBlogPost;

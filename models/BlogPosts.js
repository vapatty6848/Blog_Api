const createPosts = (sequelize, Datatypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
    userId: Datatypes.INTEGER,
  });
  return BlogPosts;
};

module.exports = createPosts;

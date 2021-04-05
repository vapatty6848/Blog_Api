const createPosts = (sequelize, Datatypes) => {
  const BlogPosts = sequelize.define('Users', {
    title: Datatypes.STRING,
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
    user_id: Datatypes.INTEGER,
  });
  return BlogPosts;
};

module.exports = createPosts;

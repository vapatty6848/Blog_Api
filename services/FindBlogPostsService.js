const { BlogPost } = require('../models');
const FindUserService = require('./FindUserService');

const FindBlogPostsService = async (id) => {
  const blogPosts = await BlogPost.findAll({
    where: { userId: id },
  });
  const user = await FindUserService(id);
  const blogPostWithUser = blogPosts.map((item) => {
    const { dataValues } = item;
    return { ...dataValues, user };
  });
  return blogPostWithUser;
};

module.exports = FindBlogPostsService;

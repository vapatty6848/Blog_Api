const { BlogPost } = require('../models');
const FindUserService = require('./FindUserService');

const FindBlogPostService = async (userId, blogPostId) => {
  const blogPost = await BlogPost.findOne({
    where: {
      id: blogPostId,
      userId,
    },
  });
  console.log(blogPost);
  const user = await FindUserService(userId);
  const { dataValues } = blogPost;
  const blogPostWithUser = { ...dataValues, user };
  return blogPostWithUser;
};

module.exports = FindBlogPostService;
